import { getAccountCollections } from '@/services/collection';
import { ICollection, NFTFormState } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  formState: NFTFormState;
  setFormState: React.Dispatch<React.SetStateAction<NFTFormState>>;
}

export const Description = ({ formState, setFormState }: Props) => {
  const [entries, setEntries] = useState([
    { id: 1, key: '', value: '' },
    { id: 2, key: '', value: '' },
    { id: 3, key: '', value: '' },
    { id: 4, key: '', value: '' },
    { id: 5, key: '', value: '' },
  ]);
  const nftTypes = ['Image', 'Video'];
  const categories = ['Art', 'Photo', 'Collectible', 'Utility', 'Asset'];

  const {
    data: collections = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['account-collections'],
    queryFn: () => getAccountCollections(),
  });

  useEffect(() => {
    if (collections.length > 0) {
      setFormState((prev) => ({
        ...prev,
        creator: collections[0].creator,
        contract: collections[0].contract,
      }));
    }
  }, [collections, setFormState]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === 'contract') {
      setFormState((prev) => ({
        ...prev,
        creator: collections[0].creator,
        contract: value,
      }));

      return;
    }

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleEntries = (id: number, field: string, value: string) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry
    );
    setEntries(updatedEntries);

    const metadata: { [key: string]: string } = {};

    updatedEntries.forEach((entry) => {
      if (entry.key && entry.value) {
        metadata[entry.key] = entry.value;
      }
    });
    setFormState((prev) => ({ ...prev, metadata }));
  };

  if (isLoading || error) return;

  return (
    <div className="mb-8 flex flex-col items-start gap-6 w-full">
      <div className="flex flex-col w-full items-start gap-1">
        <div className="w-full font-urbanist font-bold text-lg leading-[26px]">
          Describe your NFT
        </div>

        <p className="w-full font-urbanist text-black dark:text-[#B9B8BB] font-normal leading-[22px]">
          Each NFT requires a name, description, and category. You can also add
          custom attributes to your NFT metadata.
        </p>
      </div>

      <div className="flex flex-col items-start gap-5 w-full">
        <div className="flex flex-col items-start gap-3 w-full">
          <p className="w-fit font-bold  leading-5 whitespace-nowrap">
            Select a collection
          </p>

          <div className="relative w-full">
            <select
              name="contract"
              className="cursor-pointer appearance-none w-full h-[46px] px-[19px] rounded-3xl border border-solid border-[#303030] dark:border-[#ffffff99] text-black dark:text-[#B9B8BB] font-urbanist  leading-[22px]"
              value={formState.contract}
              onChange={handleChange}
            >
              <option className="text-black hover:bg-[#f3f4f6]" disabled>
                Please select a collection
              </option>
              {collections.length > 0 ? (
                collections.map((collection: ICollection) => (
                  <option
                    key={collection._id}
                    className="text-black hover:bg-[#f3f4f6]"
                    value={collection.contract}
                  >
                    {collection.name}
                  </option>
                ))
              ) : (
                <option
                  className="text-black hover:bg-[#f3f4f6]"
                  value=""
                  disabled
                >
                  Please create a collection first!
                </option>
              )}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 w-full">
          <p className="w-fit font-urbanist font-bold  leading-[18px] whitespace-nowrap">
            Name your item
          </p>

          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            placeholder="My Cool NFT"
            className="w-full h-[46px] px-[19px] rounded-3xl border border-solid border-[#303030] dark:border-[#ffffff99] text-black dark:text-[#B9B8BB] font-urbanist  leading-[22px]"
          />
        </div>

        <div className="flex flex-col items-start gap-3 w-full">
          <p className="w-fit font-urbanist font-bold  leading-[18px] whitespace-nowrap">
            Enter a short description
          </p>

          <input
            type="text"
            name="description"
            value={formState.description}
            onChange={handleChange}
            required
            placeholder="My first NFT on Nexus"
            className="w-full h-[46px] px-[19px] rounded-3xl border border-solid border-[#303030] dark:border-[#ffffff99] text-black dark:text-[#B9B8BB] font-urbanist font-normal  leading-[22px]"
          />
        </div>

        <div className="flex flex-col items-start gap-3 w-full">
          <p className="w-fit font-bold  leading-5 whitespace-nowrap">
            Current media type
          </p>

          <div className="relative w-full">
            <select
              name="nftType"
              className="cursor-pointer appearance-none w-full h-[46px] px-[19px] rounded-3xl border border-solid border-[#303030] dark:border-[#ffffff99] text-black dark:text-[#B9B8BB] font-urbanist  leading-[22px]"
              value={formState.nftType}
            >
              <option className="text-black hover:bg-[#f3f4f6]" disabled>
                Please upload your media
              </option>
              {nftTypes.map((type) => (
                <option
                  key={type}
                  className="text-black hover:bg-[#f3f4f6]"
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 w-full">
          <p className="w-fit font-bold  leading-5 whitespace-nowrap">
            Select a category for your item
          </p>

          <div className="relative w-full">
            <select
              name="category"
              className="cursor-pointer appearance-none w-full h-[46px] px-[19px] rounded-3xl border border-solid border-[#303030] dark:border-[#ffffff99] text-black dark:text-[#B9B8BB] font-urbanist  leading-[22px]"
              value={formState.category}
              onChange={handleChange}
            >
              <option
                className="text-black hover:bg-[#f3f4f6]"
                value=""
                disabled
              >
                Please select a category
              </option>
              {categories.map((type) => (
                <option
                  key={type}
                  className="text-black hover:bg-[#f3f4f6]"
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 w-full">
          <p className="w-fit font-bold  leading-5 whitespace-nowrap">
            Select a royalty fee for your item
          </p>

          <div className="relative w-full">
            <select
              name="royalties"
              className="cursor-pointer appearance-none w-full h-[46px] px-[19px] rounded-3xl border border-solid border-[#303030] dark:border-[#ffffff99] text-black dark:text-[#B9B8BB] font-urbanist  leading-[22px]"
              value={formState.royalties}
              onChange={handleChange}
            >
              <option
                className="text-black hover:bg-[#f3f4f6]"
                value=""
                disabled
              >
                Please select a royalty fee
              </option>
              {[5, 10, 15, 20].map((fee) => (
                <option
                  key={fee}
                  className="text-black hover:bg-[#f3f4f6]"
                  value={fee}
                >
                  {fee}%
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 w-full">
          <p className="w-fit font-urbanist font-bold  leading-[18px] whitespace-nowrap">
            Enter your NFT's attributes
            <span className="ml-2 font-medium">(optional)</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {entries.map((entry) => (
              <div key={`entry-${entry.id}`} className="space-y-2">
                <p className="font-urbanist  leading-[18px] whitespace-nowrap">
                  Trait {entry.id}
                </p>
                <input
                  type="text"
                  placeholder="Enter key"
                  value={entry.key}
                  onChange={(e) =>
                    handleEntries(entry.id, 'key', e.target.value)
                  }
                  className="w-full h-[46px] px-[19px] rounded-3xl border border-solid border-[#303030] dark:border-[#ffffff99] text-black dark:text-[#f3f4f6] bg-transparent font-urbanist font-normal  leading-[22px]"
                />

                <input
                  type="text"
                  placeholder="Enter value"
                  value={entry.value}
                  disabled={!entry.key}
                  onChange={(e) =>
                    handleEntries(entry.id, 'value', e.target.value)
                  }
                  className="w-full h-[46px] px-[19px] rounded-3xl border border-solid border-[#303030] dark:border-[#ffffff99] text-black dark:text-[#f3f4f6] bg-transparent font-urbanist font-normal  leading-[22px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
