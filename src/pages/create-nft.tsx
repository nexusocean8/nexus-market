import { useRef, useState } from 'react';
import { SelectNetwork } from '@/components/create-nft/SelectNetwork';
import { Publish } from '@/components/create-nft/Publish';
import { Description } from '@/components/create-nft/Description';
import { ItemType } from '@/components/create-nft/ItemType';
import { Preview } from '@/components/create-nft/Preview';
import { UploadItem } from '@/components/create-nft/UploadItem';
import { Metadata } from '@/components/Metadata';
import {
  getIPFSToken,
  getPresignedUrl,
  pinJSONToIPFS,
  pinMediaToIPFS,
  uploadToPresignedUrl,
} from '@/services/upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { NFTFormState } from '@/types';
import { usePublicClient, useWriteContract } from 'wagmi';
import { processData } from '@/utils/processData';
import deployedContracts from '@/contracts';
import { parseUnits } from 'viem';
import { createNFT } from '@/services/nft';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const gateway = 'https://blue-significant-falcon-772.mypinata.cloud'; // swap with your IPFS gateway URL

export default function CreateNFT() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [formState, setFormState] = useState<NFTFormState>({
    creator: '',
    contract: '',
    network: 763373,
    name: '',
    description: '',
    nftType: '',
    category: '',
    metadata: {},
    ipfs: '',
    media: '',
    file: null,
    royalties: 5,
  });
  const { writeContractAsync: addItem } = useWriteContract();
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();

  const handleFileChange = (e: any) => {
    if (!e.target.files) return;

    const upload = e.target.files[0];

    if (upload.type.includes('image')) {
      setFormState((prev) => ({ ...prev, file: upload, nftType: 'Image' }));
    } else if (upload.type.includes('video')) {
      setFormState((prev) => ({ ...prev, file: upload, nftType: 'Video' }));
    } else {
      toast.warning('Unsupported file type.');
      throw new Error('Unsupported file type.');
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(upload);
  };

  const triggerFileInput = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  };

  const uploadItem = async (upload: File, data: NFTFormState) => {
    const ipfsData = new FormData();
    ipfsData.append('file', upload);
    ipfsData.append('pinataMetadata', JSON.stringify({ name: upload.name }));
    ipfsData.append('pinataOptions', JSON.stringify({ cidVersion: 1 }));

    const { token } = await getIPFSToken();

    // pin media to IPFS first (0-50% progress)
    const mediaHash = await pinMediaToIPFS(ipfsData, token, (progress) => {
      setUploadProgress(Math.round(progress / 2));
    });

    const image = `${gateway}/ipfs/${mediaHash}`;

    const {
      name,
      description,
      category,
      metadata,
      contract,
      creator,
      royalties,
    } = data;

    const attributes = [
      {
        trait_type: 'Creator',
        value: creator,
      },
      {
        trait_type: 'Category',
        value: category,
      },
      ...Object.entries(metadata).map(([key, value]) => ({
        trait_type: key,
        value,
      })),
    ];

    const metadataJSON = {
      name,
      description,
      image,
      category,
      attributes,
    };

    // pin metadata to IPFS
    const tokenHash = await pinJSONToIPFS(metadataJSON, token);

    const tokenUri = `${gateway}/ipfs/${tokenHash}`;

    const royaltyFee = Number(royalties) * 10;

    const mintingFee = parseUnits('0.001', 18);

    // mint NFT
    const hash = await addItem({
      address: contract as `0x${string}`,
      abi: deployedContracts[763373].NuyceMarketNFT.abi,
      functionName: 'addItem',
      args: [tokenUri, royaltyFee], // tokenUri is json saved on chain via IPFS
      value: mintingFee, // Add minting fee
    });

    if (!publicClient) {
      throw new Error('Public client not found');
    }

    toast.info('Adding item to collection...');

    const addItemReceipt = await publicClient.waitForTransactionReceipt({
      hash,
      confirmations: 3,
    });

    if (addItemReceipt.status !== 'success') {
      throw new Error('Add item approval failed');
    }

    const { presignedUrl, fileUrl } = await getPresignedUrl(
      upload.name,
      upload.type
    );

    // upload to S3 second (50-100% progress)
    await uploadToPresignedUrl(presignedUrl, upload, (progress) => {
      setUploadProgress(50 + Math.round(progress / 2));
    });

    return { ipfs: image, media: fileUrl };
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async (variables: { data: NFTFormState }) => {
      const { data } = variables;

      const { ipfs, media } = await uploadItem(data.file as File, data);

      delete data.file;

      data.ipfs = ipfs;
      data.media = media;
      data.royalties = Number(data.royalties);

      await createNFT(data);

      return { creator: data.creator };
    },
    retry: 0,
    onSuccess: ({ creator }) => {
      queryClient.invalidateQueries({
        queryKey: ['account-assets'],
      });
      queryClient.invalidateQueries({
        queryKey: ['account-listings'],
      });
      queryClient.invalidateQueries({
        queryKey: ['account-collections'],
      });

      queryClient.invalidateQueries({
        queryKey: ['creator-assets', creator],
      });
      queryClient.invalidateQueries({
        queryKey: ['creator-listings', creator],
      });
      queryClient.invalidateQueries({
        queryKey: ['creator-collections', creator],
      });

      toast.success('Item created!');

      setUploadProgress(0);
      navigate('/account');
    },
    onError: (error: any) => {
      setUploadProgress(0);
      console.log('NFT creation error:', error);
    },
  });

  const handlePublish = (e: any) => {
    e.preventDefault();

    if (!formState.file) {
      toast.error('Missing required media!');

      return;
    }

    if (formState.description.length > 160) {
      toast.warn('Description must be under 160 characters.');

      return;
    }

    try {
      const processedData = processData<NFTFormState>(formState, [
        'creator',
        'contract',
        'network',
        'name',
        'description',
        'metadata',
        'nftType',
        'category',
        'file',
        'royalties',
      ]);

      mutate({
        data: processedData,
      });
    } catch (error) {
      toast.error('Validation failed!');
      console.log('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    setFormState({
      creator: '',
      contract: '',
      network: 763373,
      name: '',
      description: '',
      nftType: '',
      category: '',
      metadata: {},
      ipfs: '',
      media: '',
      file: null,
      royalties: 5,
    });

    setPreview(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.info('Item discarded.');
  };

  return (
    <>
      <Metadata title="Create NFT | Nexus Market" />
      <div className="w-full flex flex-col mb-20 sm:mb-32 lg:mb-40">
        <Breadcrumbs
          title="Create NFT"
          section1="Home"
          path1="/"
          section2="Account"
          path2="/account"
          page="Create NFT"
        />

        <div className="flex justify-center w-full mb-20">
          <div className="w-full xl:max-w-3xl 2xl:max-w-5xl mt-8 sm:mt-12 px-4 md:px-8">
            <form
              onSubmit={handlePublish}
              className="flex flex-col xl:flex-row justify-center gap-8"
            >
              <div className="w-full col-span-1 order-1 xl:order-2">
                <div className="mb-8 font-bold text-3xl lg:text-4xl leading-tight xl:hidden">
                  Create Something New!
                </div>

                <Preview preview={preview} nftType={formState.nftType} />
              </div>

              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              <div className="flex flex-col min-w-10/12 max-w-11/12 mx-auto col-span-1 xl:col-span-2 order-1 xl:order-1">
                <div className="mb-8 font-bold text-3xl lg:text-4xl leading-tight hidden xl:block">
                  Create Something New!
                </div>

                <ItemType />
                <UploadItem triggerFileInput={triggerFileInput} />
                <SelectNetwork />
                <Description
                  formState={formState}
                  setFormState={setFormState}
                />
                <Publish
                  isPending={isPending}
                  handleCancel={handleCancel}
                  uploadProgress={uploadProgress}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
