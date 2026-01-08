import { useMutation, useQueryClient } from '@tanstack/react-query';
import { parseEventLogs, parseUnits } from 'viem';
import { toast } from 'react-toastify'; // or your toast library
import deployedContracts from '@/contracts';
import { listNFT } from '@/services/nft';
import { usePublicClient, useWriteContract } from 'wagmi';

interface ListingMutationVariables {
  data: {
    creator: string;
    contract: string;
    tokenId: number;
    pairId: number;
    price: string;
  };
}

interface ListingMutationOptions {
  setIsOpen: Function;
}

const marketContract = deployedContracts[763373].NuyceMarket;
const nftContract = deployedContracts[763373].NuyceMarketNFT;
const auctionContract = deployedContracts[763373].NuyceAuction;

export const useListingMutation = ({ setIsOpen }: ListingMutationOptions) => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync: approve } = useWriteContract();
  const { writeContractAsync: listForSale } = useWriteContract();

  return useMutation({
    mutationFn: async (variables: ListingMutationVariables) => {
      const { data } = variables;

      if (!publicClient) {
        throw new Error('Public client must be available');
      }

      const approveTx = await approve({
        address: data.contract as `0x${string}`,
        abi: nftContract.abi,
        functionName: 'approve',
        args: [marketContract.address, String(data.tokenId)],
      });

      toast.info('Submitting approval...');

      const approveReceipt = await publicClient.waitForTransactionReceipt({
        hash: approveTx,
        confirmations: 3,
      });

      console.log(approveReceipt);

      if (approveReceipt.status !== 'success') {
        throw new Error('Approve listing failed');
      }

      const priceInWei = parseUnits(data.price, 18);

      const listTx = await listForSale({
        address: marketContract.address as `0x${string}`,
        abi: marketContract.abi,
        functionName: 'list',
        args: [data.contract, String(data.tokenId), priceInWei],
      });

      toast.info('Sending to marketplace...');
      const listReceipt = await publicClient.waitForTransactionReceipt({
        hash: listTx,
        confirmations: 3,
      });

      if (listReceipt.status !== 'success') {
        throw new Error('Listing transaction failed');
      }

      const events = parseEventLogs({
        abi: marketContract.abi,
        logs: listReceipt.logs,
      });

      const listEvent = events.find((e) => e.eventName === 'ItemListed');

      if (!listEvent) {
        throw new Error('Item listing event not found');
      }

      const pairId = (listEvent.args as any).id;

      try {
        await listNFT(
          data.contract,
          data.tokenId,
          Number(pairId),
          Number(data.price),
          true,
          false
        );
      } catch (err: any) {
        throw new Error(err);
      }

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

      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('NFT listing created!');
      setIsOpen(false);
    },
    onError: (error: any) => {
      setIsOpen(false);
      console.log('NFT listing error:', error);
      toast.error('Error listing NFT!');
    },
  });
};

interface AuctionMutationVariables {
  data: {
    creator: string;
    contract: string;
    tokenId: number;
    startingBid: string;
    startTime: string;
    endTime: string;
  };
}

interface AuctionMutationOptions {
  setIsOpen: Function;
}

export const useAuctionMutation = ({ setIsOpen }: AuctionMutationOptions) => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync: approve } = useWriteContract();
  const { writeContractAsync: createAuction } = useWriteContract();

  return useMutation({
    mutationFn: async (variables: AuctionMutationVariables) => {
      const { data } = variables;

      console.log(data);

      if (!publicClient) {
        throw new Error('Public client must be available');
      }

      const startingBid = parseUnits(data.startingBid, 18);

      const startTimestamp = Math.floor(
        new Date(data.startTime).getTime() / 1000
      );
      const endTimestamp = Math.floor(new Date(data.endTime).getTime() / 1000);

      const approveTx = await approve({
        address: data.contract as `0x${string}`,
        abi: nftContract.abi,
        functionName: 'approve',
        args: [auctionContract.address, String(data.tokenId)],
      });

      toast.info('Submitting approval...');

      const approveReceipt = await publicClient.waitForTransactionReceipt({
        hash: approveTx,
        confirmations: 3,
      });

      if (approveReceipt.status !== 'success') {
        throw new Error('Approve auction failed');
      }

      const auctionTx = await createAuction({
        address: auctionContract.address as `0x${string}`,
        abi: auctionContract.abi,
        functionName: 'createAuction',
        args: [
          data.contract,
          String(data.tokenId),
          startingBid,
          startTimestamp,
          endTimestamp,
        ],
      });
      toast.info('Creating auction...');

      const auctionReceipt = await publicClient.waitForTransactionReceipt({
        hash: auctionTx,
        confirmations: 3,
      });

      if (auctionReceipt.status !== 'success') {
        throw new Error('Create auction failed');
      }

      const pairId = 1;

      await listNFT(
        data.contract,
        data.tokenId,
        pairId,
        Number(data.startingBid),
        true,
        true
      );

      return { creator: data.creator };
    },
    retry: 0,
    onSuccess: ({ creator }) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('NFT auction created!');
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

      setIsOpen(false);
    },
    onError: (error: any) => {
      console.log('NFT auction error:', error);
      toast.error('Error creating auction!');
    },
  });
};
