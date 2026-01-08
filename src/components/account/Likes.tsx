import { getAccountLikes } from '@/services/nft';
import { useQuery } from '@tanstack/react-query';
import { INFT } from '@/types';
import { NFTCreated } from '../NFTCreated';
import { ThumbsUp } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface Props {
  selected: number;
}

export const Likes = ({ selected }: Props) => {
  const { data: likes = [] } = useQuery({
    queryKey: ['account-likes'],
    queryFn: getAccountLikes,
    enabled: selected === 4,
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {/* Show Create NFT Card only when no likes */}
        {likes.length === 0 && (
          <NavLink
            to="/explore"
            className="group relative aspect-[2/3] rounded-xl bg-surface dark:bg-surface border-2 border-dashed border-border dark:border-border hover:border-ink transition-all duration-300 hover:shadow-lg hover:shadow-ink/20 flex justify-center items-center"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-lavender-100 dark:bg-slate-mid flex items-center justify-center group-hover:bg-ink transition-colors duration-300">
                <ThumbsUp className="w-7 h-7 text-ink group-hover:text-white transition-colors duration-300" />
              </div>

              <span className="font-bold text-xl text-text dark:text-text group-hover:text-ink transition-colors duration-300">
                Discover NFTs
              </span>
            </div>
          </NavLink>
        )}

        {/* Liked NFTs */}
        {likes.length > 0 &&
          likes.map((nft: INFT) => {
            return <NFTCreated key={`liked-${nft._id}`} nft={nft} />;
          })}
      </div>
    </div>
  );
};
