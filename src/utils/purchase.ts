import deployedContracts from '@/contracts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { parseEther } from 'viem';
import { usePublicClient, useWriteContract } from 'wagmi';

const marketContract = deployedContracts[763373].NuyceMarket;

interface BuyNowMutationVariables {
  data: {
    creator: string;
    pairId: number;
    price: number;
  };
}

interface BuyNowMutationOptions {
  setIsLoading: Function;
  setIsOpen: Function;
}

export const usePurchaseMutation = ({
  setIsLoading,
  setIsOpen,
}: BuyNowMutationOptions) => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync: buyNow } = useWriteContract();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (variables: BuyNowMutationVariables) => {
      const { data } = variables;

      console.log(data);

      if (!publicClient) {
        throw new Error('Public client must be available');
      }

      const priceBigInt = parseEther(String(data.price));

      const approveTx = await buyNow({
        address: marketContract.address as `0x${string}`,
        abi: marketContract.abi,
        functionName: 'buy',
        args: [data.pairId],
        value: priceBigInt,
      });

      toast.info('Approving purchase...');

      const approveReceipt = await publicClient.waitForTransactionReceipt({
        hash: approveTx,
        confirmations: 3,
      });

      console.log(approveReceipt);

      if (approveReceipt.status !== 'success') {
        throw new Error('Approve purchase failed');
      }

      return { creator: data.creator };
    },
    retry: 0,
    onSuccess: ({ creator }) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('NFT purchase complete!');
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

      setIsLoading(false);
      setIsOpen(false);
      navigate('/account');
    },
    onError: (err: any) => {
      setIsLoading(false);
      console.log('NFT Purchase error:', err);

      toast.error('Error making purchase!');
    },
  });
};
