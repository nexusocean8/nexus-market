import { Button } from '@/components/Button';
import { AddInfo } from '@/components/create-collection/AddInfo';
import { UploadPhoto } from '@/components/create-collection/UploadPhoto';
import { Metadata } from '@/components/Metadata';
import deployedContracts from '@/contracts';
import { createCollection } from '@/services/collection';
import { imageUpload } from '@/services/upload';
import { CollectionFormState } from '@/types';
import { processData } from '@/utils/processData';
import { isValidAddress } from '@/utils/validations';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAccount, usePublicClient, useWriteContract } from 'wagmi';
import { parseEventLogs } from 'viem';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function CreateCollection() {
  const [formState, setFormState] = useState<CollectionFormState>({
    creator: '',
    name: '',
    description: '',
    website: '',
    network: 763373,
    contract: '',
    contractType: 'ERC721',
    photo: '/images/logo.webp',
    cover: '/images/banner.webp',
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { address } = useAccount();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = ['Upload Photo', 'Add Information'];
  const { writeContractAsync: createContract } = useWriteContract();
  const publicClient = usePublicClient();

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setFormState({
      creator: '',
      name: '',
      description: '',
      website: '',
      network: 763373,
      contract: '',
      contractType: 'ERC721',
      photo: '/images/logo.webp',
      cover: '/images/banner.webp',
    });
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { isPending, mutate } = useMutation({
    mutationFn: async (variables: { data: CollectionFormState }) => {
      const { data } = variables;

      if (data.description.length > 160) {
        toast.warn('Description must be under 160 characters.');
        throw new Error('Description must be under 160 characters.');
      }

      if (!publicClient) {
        throw new Error('Public client not available');
      }

      if (data.photo instanceof File) {
        const photo = data.photo as File;

        if (photo.size > 20 * 1024 * 1024) {
          toast.warn('Each photo must be under 20MB.');
          throw new Error('Each photo must be under 20MB.');
        }

        const photoData = new FormData();
        photoData.append('type', 'collection.photo');
        photoData.append('file', photo);

        // Upload Photo to s3 (0-50% progress)
        const photoUrl = await imageUpload(photoData, (progress) => {
          setUploadProgress(Math.round(progress / 2));
        });

        data.photo = photoUrl as string;
      } else {
        setUploadProgress(50);
      }

      if (data.cover instanceof File) {
        const cover = data.cover as File;

        if (cover.size > 20 * 1024 * 1024) {
          toast.warn('Each photo must be under 20MB.');
          throw new Error('Each photo must be under 20MB.');
        }

        const coverData = new FormData();
        coverData.append('type', 'collection.cover');
        coverData.append('file', cover);

        // Upload Cover to s3 (50-100% progress)
        const coverUrl = await imageUpload(coverData, (progress) => {
          setUploadProgress(50 + Math.round(progress / 2));
        });

        data.cover = coverUrl as string;
      } else {
        setUploadProgress(100);
      }

      const hash = await createContract({
        address: deployedContracts[763373].NuyceMarket.address as `0x${string}`,
        abi: deployedContracts[763373].NuyceMarket.abi,
        functionName: 'createCollection',
        args: [data.name, data.cover as string], // temp uri on contract, will be updated later
      });

      toast.info('Creating collection contract...');

      const collectionReceipt = await publicClient.waitForTransactionReceipt({
        hash,
        confirmations: 3,
      });

      if (collectionReceipt.status !== 'success') {
        throw new Error('Create collection failed');
      }

      const events = parseEventLogs({
        abi: deployedContracts[763373].NuyceMarket.abi,
        logs: collectionReceipt.logs,
      });

      const collectionEvent = events.find(
        (e) => e.eventName === 'CollectionCreated'
      );

      if (!collectionEvent) {
        throw new Error('Collection creation event not found');
      }

      data.contract = (collectionEvent.args as any).collection;

      if (!isValidAddress(data.contract)) {
        throw new Error('Invalid collection contract address');
      }

      await createCollection(data);

      return { creator: address, contract: data.contract };
    },
    retry: 0,
    onSuccess: ({ creator, contract }) => {
      queryClient.invalidateQueries({
        queryKey: ['account-collections'],
      });
      queryClient.invalidateQueries({
        queryKey: ['creator-collections', creator],
      });

      toast.success('Collection created!');

      setUploadProgress(0);
      navigate(`/collection/${contract}`);
    },
    onError: (error: any) => {
      setUploadProgress(0);

      console.log('Create collection failed:', error);
      toast.error('Create collection failed!');
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      // formState.creator = address as `0x${string}`;
      console.log(isPending);
      console.log(uploadProgress);

      const processedData = processData<CollectionFormState>(formState, [
        'creator',
        'network',
        'name',
        'description',
        'photo',
        'cover',
      ]);

      mutate({
        data: processedData,
      });
    } catch (error) {
      toast.error('Validation failed!');
      console.log('Validation failed:', error);
    }
  };

  return (
    <>
      <Metadata title="Create Collection | Nexus Market" />
      <div className="w-full flex flex-col mb-20 sm:mb-32 lg:mb-40">
        <Breadcrumbs
          title="Create Collection"
          section1="Home"
          path1="/"
          section2="Account"
          path2="/create/nft"
          page="Create Collection"
        />

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col max-w-2xl mx-auto items-center px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12"
        >
          {/* Progress Steps */}
          <div className="text-center w-[370px] md:w-xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="mt-4 sm:mt-6">
              {/* Desktop - Centered flex layout */}
              <div className="hidden sm:flex items-center justify-center">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center justify-center">
                    {/* Step Circle */}
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm ${
                        currentStep >= index
                          ? 'bg-ink border-ink text-white'
                          : 'border-border dark:border-gray-400 text-text-secondary dark:text-gray-400'
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Step Label */}
                    <div
                      className={`mx-2 text-sm md:text-base ${
                        currentStep >= index
                          ? 'text-text dark:text-text'
                          : 'text-text-secondary dark:text-gray-400'
                      }`}
                    >
                      {step}
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div
                        className={`w-12 h-0.5 mx-2 ${
                          currentStep > index
                            ? 'bg-ink'
                            : 'bg-border dark:bg-gray-400'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile - Scrollable layout */}
              <div className="sm:hidden flex items-center justify-start overflow-x-auto pb-2">
                <div className="flex items-center mx-auto min-w-fit">
                  {steps.map((step, index) => (
                    <div key={step} className="flex items-center shrink-0">
                      {/* Step Circle */}
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full border-2 text-xs ${
                          currentStep >= index
                            ? 'bg-ink border-ink text-white'
                            : 'border-border dark:border-gray-400 text-text-secondary dark:text-gray-400'
                        }`}
                      >
                        {index + 1}
                      </div>

                      {/* Step Label */}
                      <div
                        className={`mx-1 text-xs whitespace-nowrap ${
                          currentStep >= index
                            ? 'text-text dark:text-text'
                            : 'text-text-secondary dark:text-gray-400'
                        }`}
                      >
                        {step}
                      </div>

                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div
                          className={`w-6 h-0.5 mx-1 ${
                            currentStep > index
                              ? 'bg-ink'
                              : 'bg-border dark:bg-gray-400'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <div className="flex flex-col items-center">
            {currentStep === 0 && (
              <div className="flex flex-col justify-center items-center w-full mb-10">
                {/* Upload Section */}
                <UploadPhoto
                  formState={formState}
                  setFormState={setFormState}
                />

                {/* Navigation */}
                <div className="w-full flex justify-end mt-8">
                  <Button
                    type="button"
                    text="Next"
                    onClick={() => nextStep()}
                    className="w-full sm:w-auto px-6 py-3 sm:px-8 md:px-10 md:w-1/3 bg-ink rounded-xl hover-opacity text-white justify-center order-1 sm:order-2"
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="flex flex-col items-center w-full mb-10">
                {/* Info Section */}
                <AddInfo formState={formState} setFormState={setFormState} />

                <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between mt-8">
                  <Button
                    type="button"
                    text="Previous"
                    onClick={() => prevStep()}
                    className="w-full sm:w-auto px-6 py-3 sm:px-8 md:px-10 md:w-1/3 hover-opacity rounded-xl border border-ink text-ink justify-center order-2 sm:order-1"
                  />

                  <Button
                    type="submit"
                    text="Submit"
                    className="w-full sm:w-auto px-6 py-3 sm:px-8 md:px-10 md:w-1/3 bg-ink rounded-xl hover-opacity text-white justify-center order-1 sm:order-2"
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
