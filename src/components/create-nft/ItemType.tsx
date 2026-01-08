import { useNavigate } from 'react-router-dom';

export const ItemType = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 flex flex-col items-start w-full gap-4 max-w-4xl">
        <div className="flex flex-col w-full items-start gap-1">
          <h2 className="w-full font-bold text-2xl md:text-3xl leading-[42px]">
            What do you want to create?
          </h2>

          <p className="w-full font-normal text-[var(--color-text-secondary)] text-sm md:text-base leading-[22px]">
            A collection is required to create an NFT. A collection is a group
            of NFTs that share common attributes or themes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 w-full">
          <button
            type="button"
            className="cursor-pointer bg-[var(--color-surface)] border border-ink border-dashed hover:border-solid hover:shadow-lg hover:shadow-ink/20 transition-all duration-300 text-left flex w-full items-center gap-5 p-4 rounded-2xl"
          >
            <img
              className="rounded-xl w-16 h-12 object-cover"
              alt="single item"
              src="/images/single-item.png"
            />

            <div className="font-bold text-[var(--color-text)] text-lg leading-[22px]">
              Create NFT
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/create/collection')}
            className="cursor-pointer bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] hover:border-solid hover:border-ink hover:shadow-lg hover:shadow-ink/20 transition-all duration-300 text-left flex w-full items-center gap-5 p-4 rounded-2xl"
          >
            <img
              className="rounded-xl w-16 h-12 object-cover"
              alt="collection item"
              src="/images/collection-item.png"
            />

            <div className="font-bold text-[var(--color-text)] text-lg leading-[22px]">
              Create Collection
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
