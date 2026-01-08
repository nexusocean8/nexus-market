import { getAccountAssets } from '@/services/nft';
import { useQuery } from '@tanstack/react-query';
import { INFT } from '@/types';
import { NFTListing } from '../NFTListing';
import { Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface Props {
  selected: number;
}

export const Assets = ({ selected }: Props) => {
  const { data: assets = [] } = useQuery<INFT[]>({
    queryKey: ['account-assets'],
    queryFn: getAccountAssets,
    enabled: selected === 1,
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {/* Show Create NFT Card only when no assets */}
        {assets.length === 0 && (
          <NavLink
            to="/explore"
            className="group relative aspect-[2/3] rounded-xl bg-surface dark:bg-surface border-2 border-dashed border-border dark:border-border hover:border-ink transition-all duration-300 hover:shadow-lg hover:shadow-ink/20 flex justify-center items-center"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-lavender-100 dark:bg-slate-mid flex items-center justify-center group-hover:bg-ink transition-colors duration-300">
                <Search className="w-7 h-7 text-ink group-hover:text-white transition-colors duration-300" />
              </div>

              <span className="font-bold text-xl text-text dark:text-text group-hover:text-ink transition-colors duration-300">
                Search NFTs
              </span>
            </div>
          </NavLink>
        )}

        {/* NFT Listings */}
        {assets.length > 0 &&
          assets.map((nft: INFT) => {
            return <NFTListing key={`assets-${nft._id}`} nft={nft} />;
          })}
      </div>
    </div>
  );
};
