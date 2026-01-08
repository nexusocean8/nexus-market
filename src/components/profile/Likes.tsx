import { getUserLikes } from '@/services/nft';
import { useQuery } from '@tanstack/react-query';
import { INFT } from '@/types';
import { NFTCreated } from '../NFTCreated';

interface Props {
  selected: number;
  creator: string;
}

export const Likes = ({ selected, creator }: Props) => {
  const { data: likes = [] } = useQuery({
    queryKey: ['creator-likes', creator],
    queryFn: () => getUserLikes(creator),
    enabled: selected === 4,
  });

  return (
    <div className="flex flex-wrap w-full items-center gap-[26px_26px] relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 place-items-center mx-auto min-h-[461px]">
        {likes.length > 0 &&
          likes.map((nft: INFT) => {
            return <NFTCreated key={`likes-${nft.tokenId}`} nft={nft} />;
          })}
      </div>
    </div>
  );
};
