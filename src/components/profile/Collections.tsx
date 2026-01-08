import { getUserCollections } from '@/services/collection';
import { CollectionPreview } from '../CollectionPreview';
import { useQuery } from '@tanstack/react-query';
import { ICollection } from '@/types';

interface Props {
  selected: number;
  creator: string;
}

export const Collections = ({ selected, creator }: Props) => {
  const { data: collections = [] } = useQuery({
    queryKey: ['creator-collections', creator],
    queryFn: () => getUserCollections(creator),
    enabled: selected === 3,
  });

  return (
    <div className="flex flex-wrap w-full items-center gap-[26px_26px] relative">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 place-items-center mx-auto min-h-[461px]">
        {collections.length > 0 &&
          collections.map((collection: ICollection) => {
            return (
              <CollectionPreview
                key={`collection-${collection._id}`}
                collection={collection}
              />
            );
          })}
      </div>
    </div>
  );
};
