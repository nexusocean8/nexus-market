import { ICollection } from '@/types';
import { formatNumber } from '@/utils/validations';
import { Images } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface Props {
  collection: ICollection;
}

export const CollectionPreview = ({ collection }: Props) => {
  return (
    <NavLink
      to={`/collection/${collection.contract}`}
      className={`w-[307px] xl:w-[420px] h-[404px] xl:h-[385px] m-8 rounded-[10px] bg-[#1a1a2e] hover-nft`}
    >
      <div className="flex justify-between m-[19px] items-center">
        <div className="flex">
          {/* Top row: cover, name/description, total */}
          <div className="relative w-[60px] h-[60px] mr-2">
            <img
              src={collection.photo}
              alt="cover photo"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>

          <div className="relative mr-auto">
            <div className="font-bold text-[#f3f4f6] text-xl tracking-[0] leading-[26px]">
              {collection.name.length > 15
                ? `${collection.name.substring(0, 15)}...`
                : collection.name}
            </div>
            <div className="text-[#f3f4f6] tracking-[0] leading-[26px]">
              {collection.description.length > 15
                ? `${collection.description.substring(0, 15)}...`
                : collection.description}
            </div>
          </div>
        </div>

        <div className="flex p-1 w-full max-w-[100px] h-[33px] bg-[#684C5C] rounded-[10px]">
          <Images className="w-[28px] mx-2" color="#f3f4f6" />
          <span className="font-bold mr-auto text-[#f3f4f6]">
            {collection.total > 10000
              ? '10,000+'
              : formatNumber(collection.total)}
          </span>
        </div>
      </div>

      {/* Bottom: main photo */}
      <div className="w-[269px] h-[269px] md:w-auto flex items-center mx-[19px] justify-center">
        <img
          className="h-full w-full object-cover aspect-square md:aspect-auto rounded-[10px]"
          alt={collection.name}
          src={collection.cover}
        />
      </div>
    </NavLink>
  );
};
