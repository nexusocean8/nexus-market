import { INFT } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { NFTListing } from '../NFTListing';
import { getAccountListings } from '@/services/nft';

interface Props {
  selected: number;
}

export const Listings = ({ selected }: Props) => {
  const { data: creations = [] } = useQuery({
    queryKey: ['account-listings'],
    queryFn: getAccountListings,
    enabled: selected === 2,
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {/* Create NFT Card */}
        <NavLink
          to="/create/nft"
          className="group relative aspect-[2/3] rounded-xl bg-surface dark:bg-surface border-2 border-dashed border-border dark:border-border hover:border-ink transition-all duration-300 hover:shadow-lg hover:shadow-ink/20 flex justify-center items-center"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-lavender-100 dark:bg-slate-mid flex items-center justify-center group-hover:bg-ink transition-colors duration-300">
              <PlusCircle className="w-7 h-7 text-ink group-hover:text-white transition-colors duration-300" />
            </div>

            <span className="font-bold text-xl text-text dark:text-text group-hover:text-ink transition-colors duration-300">
              Create NFT
            </span>
          </div>
        </NavLink>

        {/* NFT Listings */}
        {creations.length > 0 &&
          creations.map((nft: INFT) => {
            return <NFTListing key={`creation-${nft._id}`} nft={nft} />;
          })}
      </div>
    </div>
  );
};
