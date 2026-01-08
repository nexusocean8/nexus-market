import { CircleChevronDown, RotateCcw } from 'lucide-react';
import { Button } from '@/components/Button';
import { NFTCreated } from '@/components/NFTCreated';
import { ExploreNFTs, INFT } from '@/types';

interface ResultsProps {
  nfts: INFT[];
  total: number;
  isFetching: boolean;
  setFormState: React.Dispatch<React.SetStateAction<ExploreNFTs>>;
}

export const Results = ({
  nfts,
  isFetching,
  setFormState,
  total,
}: ResultsProps) => {
  const handleLoadMore = (total: number, currentLength: number) => {
    const hasMore = currentLength < total;
    if (!hasMore || isFetching) return;

    setFormState((prev) => ({
      ...prev,
      skip: currentLength,
    }));
  };

  const handleReset = () => {
    setFormState({
      search: '',
      skip: 0,
      limit: 6,
    });

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12">
      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto">
        {nfts.length > 0 &&
          nfts.map((nft: INFT) => <NFTCreated key={nft._id} nft={nft} />)}
      </div>

      {/* No results message */}
      {nfts.length === 0 && !isFetching && (
        <div className="text-center py-20">
          <p className="text-[var(--color-text-secondary)] text-lg">
            No NFTs found. Try adjusting your filters.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {nfts.length > 0 && total > nfts.length && (
        <div className="flex justify-center mt-10">
          <Button
            type="button"
            onClick={() => handleLoadMore(total, nfts.length)}
            disabled={isFetching}
            className="bg-gradient-purple hover:opacity-90 shadow-lg shadow-ink/30 w-full max-w-xs rounded-xl transition-all duration-200"
            text={
              <span className="flex items-center justify-center gap-2 font-medium">
                {isFetching ? 'Loading...' : 'Load more'}
                <CircleChevronDown size={16} />
              </span>
            }
          />
        </div>
      )}

      {/* Reset Button */}
      {total > 0 && total === nfts.length && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={handleReset}
            className="w-full max-w-xs px-8 py-3 rounded-xl border-2 border-ink text-ink hover:bg-gradient-purple hover:text-white hover:border-transparent transition-all duration-200 font-semibold shadow-lg shadow-ink/20"
          >
            <span className="flex items-center justify-center gap-2">
              Reset search
              <RotateCcw size={16} />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
