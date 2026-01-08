import { CloudUpload } from 'lucide-react';

interface UploadMediaProps {
  triggerFileInput: Function;
}

export const UploadItem = ({ triggerFileInput }: UploadMediaProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 flex flex-col items-start gap-6 w-full max-w-4xl">
        <div className="flex flex-col w-full items-start gap-1">
          <h2 className="w-full font-bold text-2xl md:text-3xl leading-[42px]">
            Upload Your Media
          </h2>

          <p className="w-full text-[var(--color-text-secondary)] font-normal text-sm md:text-base leading-[22px]">
            Uploads can be images or videos with a maximum size of 50 MB.
          </p>
        </div>

        <button
          type="button"
          onClick={() => triggerFileInput()}
          className="cursor-pointer flex flex-col items-center justify-center w-full p-6 sm:p-10 md:p-16 lg:p-20 border-dashed  hover:border-solid border-ink bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl hover:shadow-lg hover:shadow-ink/20 transition-all duration-300"
        >
          <div className="flex flex-col items-center gap-4">
            <CloudUpload className="w-20 h-20 opacity-40 text-[var(--color-text)]" />
            <div className="flex flex-col items-center gap-1">
              <p className="font-bold text-base md:text-lg text-center leading-6 text-[var(--color-text)]">
                Upload your media here
              </p>

              <p className="font-normal text-[var(--color-text-secondary)] text-sm md:text-base text-center leading-[22px] max-w-md">
                Image and video files are supported up to 50 MB.
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
