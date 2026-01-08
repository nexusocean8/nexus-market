import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import {
  NFTCategory,
  NFTType,
  SortType,
  StatusType,
  ExploreNFTs,
} from '@/types';
import { formatSearchType } from '@/utils/validations';
import { Button } from '@/components/Button';

interface SortProps {
  total: number;
  length: number;
  setAllNFTs: Function;
  formState: ExploreNFTs;
  setFormState: React.Dispatch<React.SetStateAction<ExploreNFTs>>;
}

export const Sort = ({
  total,
  length,
  setAllNFTs,
  formState,
  setFormState,
}: SortProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({
    Status: 'Status',
    Type: 'Type',
    Category: 'Category',
    Sort: 'Sort By',
  });

  const filters = ['Status', 'Type', 'Category'];
  const statusType: StatusType[] = ['Buy Now', 'Auction'];
  const nftType: NFTType[] = ['Image', 'Video'];
  const nftCategory: NFTCategory[] = [
    'Art',
    'Photo',
    'Collectible',
    'Utility',
    'Asset',
  ];
  const sort: SortType[] = ['Trending', 'Recent', 'A to Z', 'Z to A'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (filter: string, option: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: option }));

    setFormState((prev) => {
      const updates: Partial<ExploreNFTs> = {};

      switch (filter) {
        case 'Status':
          updates.status = formatSearchType(option) as ExploreNFTs['status'];
          break;
        case 'Type':
          updates.type = formatSearchType(option) as ExploreNFTs['type'];
          break;
        case 'Category':
          updates.category = formatSearchType(
            option
          ) as ExploreNFTs['category'];
          break;
        case 'Sort':
          updates.sortBy = formatSearchType(option) as ExploreNFTs['sortBy'];
          updates.skip = 0;
          updates.limit = 6;
          break;
      }

      return { ...prev, ...updates };
    });

    if (filter === 'Sort') {
      setAllNFTs([]);
    }

    setActiveDropdown(null);
  };

  const resetFilters = () => {
    setSelectedFilters({
      Status: 'Status',
      Type: 'Type',
      Category: 'Category',
      Sort: 'Sort By',
    });

    setFormState({
      search: '',
      skip: 0,
      limit: 6,
    });

    setAllNFTs([]);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const getFilterOptions = (filterName: string) => {
    switch (filterName) {
      case 'Status':
        return statusType;
      case 'Type':
        return nftType;
      case 'Category':
        return nftCategory;
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-12 mb-10 gap-4">
      {/* Results count */}
      <div className="flex justify-between items-center">
        <span className="text-[var(--color-text-secondary)] font-medium">
          Showing {length <= total ? length : total} of {total} results
        </span>
      </div>

      {/* Controls row */}
      <div
        className="flex flex-col sm:flex-row gap-2 w-full 2xl:justify-end"
        ref={dropdownRef}
      >
        {/* Search input - hidden on 2xl+ */}
        <input
          value={formState.search}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, search: e.target.value }))
          }
          className="2xl:hidden w-full sm:flex-1 h-12 px-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent transition-all duration-200"
          placeholder="Search for NFTs"
          type="text"
        />

        {/* Search button - hidden on 2xl+ */}
        <Button
          type="submit"
          className="2xl:hidden w-full sm:w-auto bg-gradient-purple hover:opacity-90 shadow-lg shadow-ink/30 rounded-xl transition-all duration-200 my-2 px-6"
          text={
            <span className="flex items-center justify-center font-medium">
              Search
              <Search className="w-5 h-5 ml-2" />
            </span>
          }
        />

        {/* Filter dropdowns - hidden on mobile and 2xl+ */}
        <div className="hidden sm:flex lg:flex 2xl:hidden gap-2">
          {filters.map((name) => (
            <div key={name} className="relative">
              <button
                onClick={() => toggleDropdown(name)}
                className="group min-w-[140px] h-12 px-4 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] transition-all duration-200 flex items-center justify-between border border-[var(--color-border)]"
              >
                <span className="text-[var(--color-text)] font-medium">
                  {selectedFilters[name]}
                </span>
                <ChevronDown className="w-5 h-5 text-[var(--color-text-secondary)] transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {activeDropdown === name && (
                <div className="absolute z-10 mt-1 w-full">
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-xl shadow-slate-darker/20">
                    {getFilterOptions(name).map((option) => (
                      <div
                        key={option}
                        className="px-4 py-3 cursor-pointer hover:bg-gradient-purple hover:text-white transition-all duration-200 text-[var(--color-text)]"
                        onClick={() => handleOptionClick(name, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sort dropdown - always visible */}
        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => toggleDropdown('Sort')}
            className="group w-full sm:min-w-[140px] h-12 px-4 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] transition-all duration-200 flex items-center justify-between border border-[var(--color-border)]"
          >
            <span className="text-[var(--color-text)] font-medium">
              {selectedFilters.Sort}
            </span>
            <ChevronDown className="w-5 h-5 text-[var(--color-text-secondary)] transition-transform duration-200 group-hover:rotate-180" />
          </button>

          {activeDropdown === 'Sort' && (
            <div className="absolute z-30 mt-1 w-full">
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-xl shadow-slate-darker/20">
                {sort.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-3 cursor-pointer hover:bg-gradient-purple hover:text-white transition-all duration-200 text-[var(--color-text)]"
                    onClick={() => handleOptionClick('Sort', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reset button - hidden on mobile, visible on tablet+ */}
        <button
          onClick={resetFilters}
          className="group hidden sm:flex items-center gap-2 px-4 h-12 rounded-xl border border-[var(--color-border)] hover:border-ink hover:shadow-lg hover:shadow-ink/20 transition-all duration-200 text-[var(--color-text)]"
        >
          <span>Reset</span>
          <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
        </button>
      </div>
    </div>
  );
};
