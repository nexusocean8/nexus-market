import { useState } from 'react';
import { ChevronUp, Check } from 'lucide-react';
import { ExploreNFTs } from '@/types';

interface CategoryProps {
  formState: ExploreNFTs;
  setFormState: React.Dispatch<React.SetStateAction<ExploreNFTs>>;
}

const categories = ['Art', 'Photo', 'Collectible', 'Utility', 'Asset'];

const formatSearchType = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, '-');
};

export const Category = ({ formState, setFormState }: CategoryProps) => {
  const [hide, setHide] = useState(false);

  const handleClick = (category: string) => {
    const formatted = formatSearchType(category);
    setFormState((prev) => ({
      ...prev,
      category: formatted as ExploreNFTs['category'],
    }));
  };

  return (
    <div className="w-full max-w-xs flex flex-col">
      <button
        type="button"
        onClick={() => setHide((prev) => !prev)}
        className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
      >
        <h3 className="font-semibold text-xl text-[var(--color-text)]">
          Category
        </h3>
        <ChevronUp
          className={`w-6 h-6 text-[var(--color-text-secondary)] transition-transform duration-200 ${
            hide ? 'rotate-180' : ''
          }`}
        />
      </button>

      {!hide && (
        <div className="mt-6 flex flex-col space-y-4">
          {categories.map((category) => (
            <label
              key={category}
              onClick={() => handleClick(category)}
              className="relative h-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-ink hover:shadow-lg hover:shadow-ink/20 transition-all duration-200 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formState.category === formatSearchType(category)}
                onChange={() => handleClick(category)}
                className="peer sr-only"
              />
              <div className="absolute w-5 h-5 top-3.5 left-5 rounded border border-[var(--color-border)] peer-checked:bg-gradient-purple peer-checked:border-0 flex items-center justify-center transition-all duration-200">
                <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
              </div>
              <div className="flex items-center justify-center h-full text-[var(--color-text)] font-medium">
                {category}
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
