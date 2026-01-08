import { useAppKit } from '@reown/appkit/react';

export const SelectNetwork = () => {
  const { open } = useAppKit();

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 flex flex-col items-start w-full gap-4 max-w-4xl">
        <div className="flex flex-col w-full items-start gap-1">
          <h2 className="w-full font-bold text-2xl md:text-3xl leading-[42px]">
            Select a Network
          </h2>

          <p className="w-full text-[var(--color-text-secondary)] font-normal text-sm md:text-base leading-[22px]">
            We currently support Ink Chain for creating NFTs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => open({ view: 'Networks' })}
          className="flex items-center gap-3 px-6 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-ink hover:shadow-lg hover:shadow-ink/20 transition-all duration-300 rounded-2xl"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img
              className="w-full h-full object-cover object-center"
              alt="Ink Chain"
              src="/images/logo.webp"
            />
          </div>

          <span className="font-bold text-[var(--color-text)] text-base md:text-lg">
            Ink Chain (ETH)
          </span>
        </button>
      </div>
    </div>
  );
};
