import { getAccountCollections } from '@/services/collection';
import { PlusCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { CollectionPreview } from '../CollectionPreview';
import { useQuery } from '@tanstack/react-query';
import { ICollection } from '@/types';

interface Props {
  selected: number;
}

export const Collections = ({ selected }: Props) => {
  const { data: collections = [] } = useQuery({
    queryKey: ['account-collections'],
    queryFn: getAccountCollections,
    enabled: selected === 3,
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Create Collection Card */}
        <NavLink
          to="/create/collection"
          className="group relative aspect-[4/3] rounded-xl bg-surface dark:bg-surface border-2 border-dashed border-border dark:border-border hover:border-ink transition-all duration-300 hover:shadow-lg hover:shadow-ink/20 flex justify-center items-center"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-lavender-100 dark:bg-slate-mid flex items-center justify-center group-hover:bg-ink transition-colors duration-300">
              <PlusCircle className="w-7 h-7 text-ink group-hover:text-white transition-colors duration-300" />
            </div>

            <span className="font-bold text-xl text-text dark:text-text group-hover:text-ink transition-colors duration-300">
              Create Collection
            </span>
          </div>
        </NavLink>

        {/* Collection Previews */}
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
