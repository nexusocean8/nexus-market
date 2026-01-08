import { ChevronDown, Search } from 'lucide-react';
import { ExploreNFTs } from '@/types';
import { useAppKit } from '@reown/appkit/react';
import { Button } from '@/components/Button';

interface FilterProps {
  formState: ExploreNFTs;
  setFormState: React.Dispatch<React.SetStateAction<ExploreNFTs>>;
}

export const Filter = ({ formState, setFormState }: FilterProps) => {
  const { open } = useAppKit();

  return (
    <div className="w-full flex flex-col space-y-5">
      <h3 className="font-semibold text-xl text-[var(--color-text)]">Search</h3>

      {/* Network Selector */}
      <button
        type="button"
        onClick={() => open({ view: 'Networks' })}
        className="group w-full h-12 flex items-center px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-ink hover:shadow-lg hover:shadow-ink/20 transition-all duration-200"
      >
        <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-lavender-300/50">
          <img
            className="w-full h-full object-cover"
            alt="Base"
            src="/images/ink-logo.png"
          />
        </div>
        <span className="ml-3 text-[var(--color-text)] font-medium">
          Ink Chain (ETH)
        </span>
        <ChevronDown className="ml-auto h-5 w-5 text-[var(--color-text-secondary)] transition-transform duration-200 group-hover:rotate-180" />
      </button>

      {/* Search Input */}
      <input
        type="text"
        value={formState.search}
        onChange={(e) => setFormState({ ...formState, search: e.target.value })}
        placeholder="Search for NFTs"
        className="w-full h-12 border border-[var(--color-border)] rounded-xl px-4 text-[var(--color-text)] placeholder-[var(--color-text-secondary)] bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent transition-all duration-200"
      />

      {/* Search Button */}
      <Button
        type="submit"
        className="bg-gradient-purple hover:opacity-90 shadow-lg shadow-ink/30 rounded-xl transition-all duration-200"
        text={
          <span className="flex items-center justify-center font-medium">
            Search
            <Search className="w-5 h-5 ml-2" />
          </span>
        }
      />
    </div>
  );
};
