import { getUserNFTs } from '@/services/nft';
import { useQuery } from '@tanstack/react-query';
import { INFT } from '@/types';
import { NFTCreated } from '../NFTCreated';

interface Props {
  creator: string;
  selected: number;
}

export const Assets = ({ creator, selected }: Props) => {
  const { data: assets = [] } = useQuery<INFT[]>({
    queryKey: ['creator-assets', creator],
    queryFn: () => getUserNFTs(creator),
    enabled: selected === 1,
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {assets.length > 0 &&
          assets.map((nft) => {
            return <NFTCreated key={`likes-${nft.tokenId}`} nft={nft} />;
          })}
      </div>
    </div>
  );
};
