interface Props {
  isPending: boolean;
  uploadProgress: number;
  handleCancel: Function;
}

export const Publish = ({ isPending, uploadProgress, handleCancel }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 flex flex-col items-start gap-6 w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
          <button
            type="submit"
            disabled={isPending}
            className="bg-gradient-purple hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-ink/30 flex justify-center items-center gap-2.5 px-8 py-3.5 w-full sm:max-w-xs rounded-2xl transition-all duration-300"
          >
            <span className="font-bold text-white text-base md:text-lg">
              {isPending ? `${uploadProgress}%` : 'Publish'}
            </span>
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={() => handleCancel()}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-ink hover:shadow-lg hover:shadow-ink/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2.5 px-8 py-3.5 w-full sm:max-w-xs rounded-2xl transition-all duration-300"
          >
            <span className="font-bold text-[var(--color-text)] text-base md:text-lg">
              Reset
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
