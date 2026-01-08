import { Button } from '../Button';
import { ButtonLine } from '../ButtonLine';
import { useState } from 'react';
import { LoaderCircle, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuctionMutation, useListingMutation } from '@/utils/listings';
import { useAccount } from 'wagmi';

interface Props {
  name: string;
  contract: string;
  tokenId: number;
  pairId: number;
  setIsOpen: Function;
}

export const ListItem = ({
  name,
  contract,
  tokenId,
  pairId,
  setIsOpen,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<
    'listForSale' | 'createAuction'
  >('listForSale');
  const [price, setPrice] = useState<string>('0.001');
  const [startingBid, setStartingBid] = useState('0.001');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { address } = useAccount();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow any input during typing (including empty string)
    setPrice(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseFloat(value);

    // If empty or below minimum, set to minimum
    if (value === '' || isNaN(numValue) || numValue < 0.001) {
      setPrice('0.001');
    }
    // If valid number >= minimum, keep it
    else {
      setPrice(String(numValue));
    }
  };

  const handleStartingBidChange = (e: any) => {
    setStartingBid(e.target.value);
  };

  const handleAuctionBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseFloat(value);

    // If empty or below minimum, set to minimum
    if (value === '' || isNaN(numValue) || numValue < 0.001) {
      setStartingBid('0.001');
    }
    // If valid number >= minimum, keep it
    else {
      setStartingBid(String(numValue));
    }
  };

  const listingMutation = useListingMutation({
    setIsOpen,
  });

  const handleApproveListing = () => {
    if (!address) return;

    if (price && Number(price) >= 0.001) {
      listingMutation.mutate({
        data: { creator: address, contract, tokenId, pairId, price },
      });
    } else {
      toast.warning('Price must be greater than 0.');
    }
  };

  const auctionMutation = useAuctionMutation({
    setIsOpen,
  });

  const handleApproveAuction = () => {
    if (!address) return;

    if (startingBid && Number(startingBid) >= 0.001 && startTime && endTime) {
      auctionMutation.mutate({
        data: {
          creator: address,
          contract,
          tokenId,
          startingBid,
          startTime,
          endTime,
        },
      });
    } else {
      toast.warning('Starting bid must be greater than 0.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-60 p-4">
      <div className="relative w-full max-w-md bg-[#303030] rounded-[10px] shadow-lg overflow-hidden">
        <div className="p-6">
          {/* Header with close button */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="font-urbanist font-semibold text-[#f3f4f6] text-2xl text-center leading-[34px]">
                Sell NFT
              </h2>
            </div>
            <button
              type="button"
              disabled={auctionMutation.isPending || listingMutation.isPending}
              onClick={() => setIsOpen(false)}
              className="ml-4 p-2 hover-opacity"
            >
              <X className="w-5 h-5 text-[#f3f4f6]" />
            </button>
          </div>

          {/* Option selection */}
          <div className="my-4">
            <div className="flex space-x-2">
              <button
                disabled={
                  auctionMutation.isPending || listingMutation.isPending
                }
                onClick={() => setSelectedOption('listForSale')}
                className={`hover-opacity flex-1 py-3 px-4 rounded-[8px] font-urbanist font-medium transition-all ${
                  selectedOption === 'listForSale'
                    ? 'bg-[#684C5C] text-[#f3f4f6]'
                    : 'bg-[#2a2a2a] text-[#bbbbbb] hover:bg-[#3a3a3a]'
                }`}
              >
                List For Sale
              </button>
              <button
                disabled={
                  auctionMutation.isPending || listingMutation.isPending
                }
                onClick={() => setSelectedOption('createAuction')}
                className={`hover-opacity flex-1 py-3 px-4 rounded-[8px] font-urbanist font-medium transition-all ${
                  selectedOption === 'createAuction'
                    ? 'bg-[#684C5C] text-[#f3f4f6]'
                    : 'bg-[#2a2a2a] text-[#bbbbbb] hover:bg-[#3a3a3a]'
                }`}
              >
                Create Auction
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-urbanist text-[#f3f4f6] font-bold text-[15px] mb-2">
              Item Name
            </label>
            <div className="w-full h-[50px] rounded-[10px] border border-[#f3f4f6] bg-transparent px-[19px] overflow-clip text-[17px] leading-6 text-pink-300 flex items-center">
              {name}
            </div>
          </div>

          {/* List for Sale content */}
          {selectedOption === 'listForSale' && (
            <form>
              {/* NFT Name Display */}

              {/* Price input */}
              <div className="mb-4">
                <label className="block font-urbanist font-bold text-[#f3f4f6] text-[15px] mb-2">
                  Set Price
                </label>
                <input
                  type="number"
                  value={price}
                  step="0.001"
                  disabled={listingMutation.isPending}
                  onChange={handlePriceChange}
                  onBlur={handleBlur}
                  placeholder="0.001 ETH"
                  className="w-full h-[50px] rounded-[10px] border border-[#f3f4f6] bg-transparent px-[19px] font-medium font-urbanist text-[17px] leading-6 text-[#f3f4f6] placeholder-gray-400 focus:ring-0 focus:outline-none focus:border-gray-300"
                />
              </div>

              {/* Fee breakdown */}
              <div className="mb-8 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-urbanist font-normal text-[#bbbbbb] text-[17px] leading-6">
                    Platform fee (2.5%):
                  </span>
                  <span className="font-urbanist font-medium text-[#f3f4f6] text-[17px] leading-6">
                    {price ? (Number(price) * 0.025).toFixed(3) : '0.000'} ETH
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-urbanist font-normal text-[#bbbbbb] text-[17px] leading-6">
                    You will receive:
                  </span>
                  <span className="font-urbanist font-medium text-pink-300 text-[17px] leading-6">
                    {price ? (Number(price) * 0.975).toFixed(3) : '0.000'} ETH
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-4">
                <Button
                  type="button"
                  onClick={handleApproveListing}
                  disabled={listingMutation.isPending}
                  text={
                    listingMutation.isPending ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      'Create Listing'
                    )
                  }
                  className="hover-opacity bg-[#684C5C] justify-center flex items-center w-full h-[50px] rounded-[10px] text-[#f3f4f6]"
                />
                <ButtonLine
                  type="button"
                  disabled={listingMutation.isPending}
                  onClick={() => setIsOpen(false)}
                  className="hover-opacity justify-center flex items-center text-[#f3f4f6] w-full h-[50px] rounded-[10px]"
                  text="Cancel"
                />
              </div>
            </form>
          )}

          {/* Create Auction content */}
          {selectedOption === 'createAuction' && (
            <form>
              {/* Starting bid input */}
              <div className="mb-4">
                <label className="block font-urbanist font-bold text text-[15px] mb-2">
                  Starting Bid
                </label>
                <input
                  type="number"
                  value={startingBid}
                  step="0.001"
                  disabled={auctionMutation.isPending}
                  onChange={handleStartingBidChange}
                  onBlur={handleAuctionBlur}
                  placeholder="0.001 ETH"
                  className="w-full h-[50px] rounded-[10px] border border-[#f3f4f6] bg-transparent px-[19px] font-medium font-urbanist text-[17px] leading-6 text-[#f3f4f6] placeholder-gray-400 focus:ring-0 focus:outline-none focus:border-gray-300"
                />
              </div>

              {/* Time inputs */}
              <div className="mb-4 space-y-4">
                <div>
                  <label className="block font-urbanist font-bold text text-[15px] mb-2">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={startTime}
                    disabled={auctionMutation.isPending}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full h-[50px] rounded-[10px] border border-[#f3f4f6] bg-transparent px-[19px] font-medium font-urbanist text-[17px] leading-6 text-[#f3f4f6] focus:ring-0 focus:outline-none focus:border-gray-300"
                  />
                </div>
                <div>
                  <label className="block font-urbanist font-bold text text-[15px] mb-2">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={endTime}
                    disabled={auctionMutation.isPending}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full h-[50px] rounded-[10px] border border-[#f3f4f6] bg-transparent px-[19px] font-medium font-urbanist text-[17px] leading-6 text-[#f3f4f6] focus:ring-0 focus:outline-none focus:border-gray-300"
                  />
                </div>
              </div>

              {/* Auction details */}
              <div className="mb-8 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-urbanist font-normal text-[#bbbbbb] text-[17px] leading-6">
                    Platform fee (2.5%):
                  </span>
                  <span className="font-urbanist font-medium text-[#f3f4f6] text-[17px] leading-6">
                    Applied to final bid
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-urbanist font-normal text-[#bbbbbb] text-[17px] leading-6">
                    Minimum bid:
                  </span>
                  <span className="font-urbanist font-medium text-pink-300 text-[17px] leading-6">
                    {startingBid || '0.000'} ETH
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-4">
                <Button
                  type="button"
                  onClick={handleApproveAuction}
                  disabled={auctionMutation.isPending}
                  className="hover-opacity bg-[#684C5C] justify-center flex items-center w-full h-[50px] rounded-[10px] text-[#f3f4f6]"
                  text={
                    auctionMutation.isPending ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      'Create Auction'
                    )
                  }
                />
                <ButtonLine
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={auctionMutation.isPending}
                  className="hover-opacity justify-center flex items-center text-[#f3f4f6] w-full h-[50px] rounded-[10px]"
                  text="Cancel"
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
