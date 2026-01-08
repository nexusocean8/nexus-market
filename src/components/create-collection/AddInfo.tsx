import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { TextArea } from '../TextArea';
import { CollectionFormState } from '@/types';
import { useAppKit } from '@reown/appkit/react';

interface EditInfoProps {
  formState: CollectionFormState;
  setFormState: React.Dispatch<React.SetStateAction<CollectionFormState>>;
}

export const AddInfo = ({ formState, setFormState }: EditInfoProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { open } = useAppKit();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file.size > 20 * 1024 * 1024) {
      toast.warn('Cover photo must be under 20MB.');
      return;
    }

    setFormState((prev) => ({ ...prev, cover: file }));

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
      <div className="w-full dark:bg-slate-dark border border-border dark:border-slate-dark rounded-xl p-5 md:p-8">
        {/* Cover Photo Section */}
        <div className="mb-8 md:mb-12">
          <div className="shadow-xl w-full max-w-md md:max-w-full aspect-video flex justify-center rounded-xl mx-auto">
            <div
              className="aspect-video h-full bg-no-repeat bg-center bg-cover rounded-xl flex items-center justify-center relative overflow-hidden w-full"
              style={{
                backgroundImage: preview
                  ? `url(${preview})`
                  : `url(${formState.cover})`,
              }}
            >
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/bmp, image/tiff, image/webp"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              <Button
                type="button"
                onClick={triggerFileInput}
                text="Upload Cover"
                className="hover-opacity font-semibold text-white bg-ink rounded-xl mx-4 w-auto md:max-w-1/3"
              />
            </div>
          </div>
        </div>

        {/* Collection Info Section */}
        <div className="space-y-6">
          <div className="font-semibold text-xl sm:text-2xl md:text-3xl text-text dark:text-text">
            Collection Info
          </div>

          {/* Name and Website Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              className="rounded-xl border border-solid px-4 py-3 sm:px-5 flex w-full bg-transparent text-text dark:text-text border-border dark:border-slate-light"
              type="text"
              required
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeHolder="Collection Name"
            />

            <Input
              className="rounded-xl border border-solid px-4 py-3 sm:px-5 flex w-full bg-transparent text-text dark:text-text border-border dark:border-slate-light"
              type="url"
              required={false}
              name="website"
              value={formState.website || ''}
              onChange={handleChange}
              placeHolder="Website"
            />
          </div>

          {/* Network and Contract Type Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <button
              type="button"
              onClick={() => open({ view: 'Networks' })}
              className="hover-opacity w-full h-12"
            >
              <div className="w-full h-full rounded-full border border-solid hover:border-2 border-border dark:border-slate-light text-text-secondary dark:text-text-secondary flex items-center justify-center px-4">
                <div className="flex items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover object-center"
                      alt="Ink"
                      src="/logo.png"
                    />
                  </div>
                  <span className="ml-2 sm:ml-3 font-semibold">
                    Ink Chain (ETH)
                  </span>
                </div>
              </div>
            </button>

            <div className="relative">
              <select
                className="cursor-pointer appearance-none w-full h-12 px-4 pr-10 rounded-full border border-solid hover:border-2 border-border dark:border-slate-light text-text-secondary dark:text-text-secondary bg-transparent text-sm sm:text-base"
                name="contractType"
                required
                value="ERC721"
              >
                <option className="text-black hover:bg-gray-100" disabled>
                  Select a collection type
                </option>
                <option value="ERC721" className="text-black hover:bg-gray-100">
                  Unique Items (ERC721)
                </option>
                <option
                  value="ERC1155"
                  className="text-black hover:bg-gray-100"
                >
                  Multiple Copies (ERC1155)
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="w-full">
            <TextArea
              className="h-24 sm:h-28 rounded-xl border border-solid p-4 sm:p-5 flex w-full bg-transparent text-text dark:text-text border-border dark:border-slate-light resize-none"
              required
              name="description"
              value={formState.description}
              onChange={handleChange}
              placeHolder="Tell us more about your collection..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
