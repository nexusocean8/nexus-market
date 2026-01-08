import { Button } from '@/components/Button';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { CollectionFormState } from '@/types';

interface EditInfoProps {
  formState: CollectionFormState;
  setFormState: React.Dispatch<React.SetStateAction<CollectionFormState>>;
}

export const UploadPhoto = ({ formState, setFormState }: EditInfoProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: any) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file.size > 20 * 1024 * 1024) {
      toast.warn('Collection photo must be under 20MB.');
      return;
    }

    setFormState((prev) => ({ ...prev, photo: file }));

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  };

  return (
    <div className="w-[370px] md:w-2xl mx-auto">
      <div className="w-full bg-surface dark:bg-slate-dark border border-border dark:border-slate-dark rounded-xl p-5 md:p-8">
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png, image/bmp, image/tiff, image/webp"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          {/* Image Preview */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square mb-8">
            <img
              src={preview ? preview : `${formState.photo}`}
              className="w-full h-full object-cover shadow-xl rounded-xl"
              alt="Preview"
            />
          </div>

          {/* Title */}
          <h3 className="font-semibold text-text dark:text-text text-xl sm:text-2xl md:text-3xl text-center">
            Primary Photo
          </h3>

          {/* Upload Button */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <Button
              type="button"
              onClick={triggerFileInput}
              className="bg-ink rounded-xl justify-center px-6 py-3 sm:px-8 md:px-10 flex w-full hover-opacity text-white"
              text="Upload Photo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
