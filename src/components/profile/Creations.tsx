import { getUserCreations } from '@/services/nft';
import { INFT } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { NFTCreated } from '../NFTCreated';

interface Props {
  selected: number;
  creator: string;
}

export const Creations = ({ selected, creator }: Props) => {
  const { data: creations = [] } = useQuery({
    queryKey: ['creator-listings', creator],
    queryFn: () => getUserCreations(creator),
    enabled: selected === 2,
  });

  return (
    <div className="flex flex-wrap w-full items-center gap-[26px_26px] relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 place-items-center mx-auto min-h-[461px]">
        {creations.length > 0 &&
          creations.map((nft: INFT) => {
            return <NFTCreated key={`creation-${nft.tokenId}`} nft={nft} />;
          })}
      </div>
    </div>
  );
};
