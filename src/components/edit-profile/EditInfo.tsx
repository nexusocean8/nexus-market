import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { TextArea } from '@/components/TextArea';
import { imageUpload } from '@/services/upload';
import { updateUser } from '@/services/user';
import { InfoFormState } from '@/types';
import { processData } from '@/utils/processData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ButtonLine } from '../ButtonLine';
import { isValidUsername } from '@/utils/validations';
import { useNavigate } from 'react-router-dom';

interface Props {
  formState: InfoFormState;
  setFormState: React.Dispatch<React.SetStateAction<InfoFormState>>;
}

export const EditInfo = ({ formState, setFormState }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [upload, setUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      data: Partial<InfoFormState>;
      file: File | null;
    }) => {
      const { data, file } = variables;

      const { ...update } = data;

      if (file) {
        const formData = new FormData();
        formData.append('type', 'profile.cover');
        formData.append('file', file);

        const url = await imageUpload(formData);

        setPreview(url);

        const profile = { ...update, cover: url };

        await updateUser(profile);

        return { creator: profile.address };
      }

      await updateUser(update);

      return { creator: update.address };
    },
    retry: 0,
    onSuccess: ({ creator }) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('Profile updated!');
      queryClient.invalidateQueries({
        queryKey: ['account'],
      });
      queryClient.invalidateQueries({
        queryKey: ['creator', creator],
      });

      navigate('/account');
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

    if (formState.bio && formState.bio.length > 300) {
      toast.warn('Bio must be under 300 characters.');

      return;
    }

    if (!isValidUsername(formState.username)) {
      toast.warn('Username must be under 15 characters.');

      return;
    }

    try {
      const processedData = processData<InfoFormState>(formState, [
        'address',
        'username',
        'cover',
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
        className="w-full max-w-[370px] md:max-w-[700px] h-auto bg-surface dark:bg-surface border border-border dark:border-border rounded-[10px] p-5 md:p-[30px]"
      >
        <div
          className="relative text-center shadow-xl w-full aspect-video mb-6 bg-no-repeat bg-center bg-cover rounded-[10px] items-center flex"
          style={{
            backgroundImage: preview
              ? `url(${preview})`
              : `url(${formState.cover})`,
          }}
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

          <Button
            type="button"
            onClick={triggerFileInput}
            text="Change Cover"
            className="bg-ink dark:bg-ink !rounded-[10px] !gap-[10px] !justify-center !px-[32.64px] !py-[13.99px] max-w-1/2 mx-auto mt-12 flex opacity-80 hover-opacity"
          />
        </div>

        <div className="w-full space-y-6">
          <div className="w-full font-urbanist font-semibold text-[24px] tracking-[0] leading-[27.0px]">
            Welcome, {formState.username}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              className="!rounded-[10px] !gap-[10px] !border-[0.93px] !border-solid !px-[18.65px] !py-[13.99px] !flex w-full"
              divClassName="!mt-[-0.93px] !font-urbanist !w-full"
              type="text"
              required={false}
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              placeHolder="First name"
            />
            <Input
              className="!rounded-[10px] !gap-[10px] !border-[0.93px] !border-solid !px-[18.65px] !py-[13.99px] !flex w-full"
              divClassName="!mt-[-0.93px] !font-urbanist !w-full"
              type="text"
              required={false}
              name="username"
              value={formState.username}
              onChange={handleChange}
              placeHolder="Username"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              className="!rounded-[10px] !gap-[10px] !border-[0.93px] !border-solid !px-[18.65px] !py-[13.99px] !flex w-full"
              divClassName="!mt-[-0.93px] !font-urbanist !w-full"
              type="email"
              required={false}
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeHolder="Email"
            />
            <Input
              className="!rounded-[10px] !gap-[10px] !border-[0.93px] !border-solid !px-[18.65px] !py-[13.99px] !flex w-full"
              divClassName="!mt-[-0.93px] !font-urbanist !w-full"
              type="text"
              required={false}
              name="company"
              value={formState.company}
              onChange={handleChange}
              placeHolder="Company"
            />
          </div>

          <Input
            className="!rounded-[10px] !gap-[10px] !border-[0.93px] !border-solid !px-[18.65px] !py-[13.99px] !flex w-full"
            divClassName="!mt-[-0.93px] !font-urbanist !w-full"
            type="url"
            required={false}
            name="website"
            value={formState.website}
            onChange={handleChange}
            placeHolder="Website"
          />

          <TextArea
            className="!h-[187px] !rounded-[10px] !gap-[10px] !border-[0.93px] !border-solid !pt-[18.65px] !pb-[13.99px] !px-[18.65px] !flex w-full align-top"
            divClassName="!mt-[-0.93px] !font-urbanist !w-full text-start self-start"
            required={false}
            name="bio"
            value={formState.bio}
            onChange={handleChange}
            placeHolder="What would you like others to know about you?"
          />

          <div className="flex justify-end">
            <ButtonLine
              type="submit"
              onClick={() => {}}
              className="hover-opacity !rounded-[10px] text-center !gap-[10px] !py-[13.99px]"
              text={
                <span className="w-[100px] mx-auto flex justify-center">
                  {isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    'Update Profile'
                  )}
                </span>
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};
