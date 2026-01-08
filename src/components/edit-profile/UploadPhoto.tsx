import { Button } from '@/components/Button';
import { imageUpload } from '@/services/upload';
import { updateUser } from '@/services/user';
import { InfoFormState, PhotoFormState } from '@/types';
import { processData } from '@/utils/processData';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ButtonLine } from '../ButtonLine';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';

interface Props {
  formState: InfoFormState;
  setFormState: React.Dispatch<React.SetStateAction<InfoFormState>>;
}

export const UploadPhoto = ({ formState, setFormState }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [upload, setUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleFileChange = (e: any) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file.size > 20 * 1024 * 1024) {
      toast.warn('Profile photo must be under 20MB.');
      return;
    }

    setUpload(file);

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

  const { mutate, isPending } = useMutation({
    mutationFn: async (variables: {
      data: PhotoFormState;
      file: File | null;
    }) => {
      const { data, file } = variables;

      if (!file) {
        throw new Error('File is required for photo update.');
      }

      const { ...update } = data;

      const formData = new FormData();
      formData.append('type', 'profile.photo');
      formData.append('file', file);

      const url = await imageUpload(formData);

      setPreview(url);

      const user = { ...update, photo: url };

      setFormState((prev) => ({ ...prev, ...user }));

      await updateUser(user);

      return { address: formState.address };
    },
    retry: 0,
    onSuccess: ({ address }) => {
      queryClient.invalidateQueries({
        queryKey: ['account'],
      });
      queryClient.invalidateQueries({
        queryKey: ['creator', address],
      });

      toast.success('Photo updated!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onError: (error: any) => {
      setUpload(null);
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      console.log('Update failed:', error);
      toast.error('Update failed!');
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!upload) {
      toast.warn('Change your photo to update.');

      return;
    }

    try {
      const processedData = processData<InfoFormState>(formState, [
        'address',
        'username',
        'photo',
      ]);

      mutate({
        data: processedData,
        file: upload,
      });
    } catch (error) {
      toast.error('Validation failed!');
      console.log('Validation failed:', error);
    }
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[370px] md:max-w-[700px] xl:max-w-[400px] h-[578px] bg-surface dark:bg-surface border border-border dark:border-border rounded-[10px]"
      >
        <input
          type="file"
          accept="
              image/jpeg,
              image/jpg,
              image/png,
              image/bmp,
              image/tiff,
              image/webp"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div className="mx-auto w-[300px] md:!w-[340px] h-[300px] md:h-[340px] mt-6 bg-[100%_100%]">
          {formState.photo && (
            <img
              src={preview ? preview : formState.photo}
              className="w-full h-full object-cover rounded-full shadow-xl"
              alt="Preview"
            />
          )}
        </div>

        <div className="mx-auto max-w-[300px] md:max-w-[340px] bg-[100%_100%] flex flex-col space-y-6">
          <Button
            type="button"
            onClick={triggerFileInput}
            className="bg-ink dark:bg-ink !rounded-[10px] !gap-[10px] !justify-center !px-[32.64px] !py-[13.99px] w-full mt-12 flex hover-opacity"
            text="Change Photo"
          />

          <ButtonLine
            type="submit"
            onClick={() => {}}
            className={`hover-opacity flex !rounded-[10px] !gap-[10px] !justify-center !border-[0.93px] !border-solid !px-[32.64px] !py-[13.99px] !items-center w-full`}
            text={
              isPending ? (
                <LoaderCircle className="animate-spin mx-auto" />
              ) : (
                'Update Photo'
              )
            }
          />
        </div>
      </form>
    </div>
  );
};
