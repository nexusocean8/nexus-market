import { Button } from '../Button';
import { ButtonLine } from '../ButtonLine';
import { useState } from 'react';
import { LoaderCircle, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

interface Props {
  name: string;
  contract: string;
  tokenId: number;
  pairId: number;
  setIsOpen: Function;
}

export const UnlistItem = ({
  name,
  contract,
  tokenId,
  pairId,
  setIsOpen,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();

  const handleUnlist = () => {
    setIsLoading(false);
    console.log(contract, tokenId, pairId);

    toast.success('Item unlisted!');

    setIsOpen(false);

    if (!address) return;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-60 p-4">
      <div className="relative w-full max-w-md bg-[#303030] rounded-[10px] shadow-lg overflow-hidden">
        <div className="p-6">
          {/* Header with close button */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="font-urbanist font-semibold text-[#f3f4f6] text-2xl text-center leading-[34px]">
                Unlist NFT
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="ml-4 p-2 hover-opacity"
            >
              <X className="w-5 h-5 text-[#f3f4f6]" />
            </button>
          </div>

          <div>
            {/* NFT Name Display */}
            <div className="mb-4">
              <label className="block font-urbanist text-[#f3f4f6] font-bold text-[15px] mb-2">
                Item Name
              </label>
              <div className="w-full h-[50px] rounded-[10px] border border-[#f3f4f6] bg-transparent px-[19px] font-medium font-urbanist text-[17px] leading-6 text-pink-300 flex items-center">
                {name}
              </div>
            </div>

            {/* Warning message */}
            <div className="mb-8 p-4 rounded-[8px] bg-[#2a2a2a] border border-[#444444]">
              <p className="font-urbanist font-normal text-[#bbbbbb] text-[15px] leading-6">
                This will remove your NFT from the marketplace. You can list it
                again at any time.
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
              <Button
                type="button"
                onClick={handleUnlist}
                text={
                  isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    'Remove Listing'
                  )
                }
                className="hover-opacity bg-[#684C5C] justify-center flex items-center w-full h-[50px] rounded-[10px] text-[#f3f4f6]"
              />
              <ButtonLine
                type="button"
                onClick={() => setIsOpen(false)}
                className="hover-opacity justify-center flex items-center text-[#f3f4f6] w-full h-[50px] rounded-[10px]"
                text="Cancel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
