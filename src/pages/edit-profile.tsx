import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EditInfo } from '@/components/edit-profile/EditInfo';
import { UploadPhoto } from '@/components/edit-profile/UploadPhoto';
import { Metadata } from '@/components/Metadata';
import { getAccount } from '@/services/user';
import { InfoFormState, IUser } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function EditProfile() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<IUser>({
    queryKey: ['account'],
    queryFn: getAccount,
  });

  const [formState, setFormState] = useState<InfoFormState>({
    address: '',
    username: '',
    photo: '',
    firstName: '',
    email: '',
    company: '',
    bio: '',
    website: '',
    cover: '',
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line
      setFormState({
        address: user.address,
        username: user.username,
        photo: user.photo,
        firstName: user.firstName || '',
        email: user.email || '',
        company: user.company || '',
        bio: user.bio || '',
        website: user.website || '',
        cover: user.cover,
      });
    }
  }, [user]);

  if (isLoading) return;

  if (!user || error) return <Navigate to="/not-found" />;

  return (
    <>
      <Metadata title="Edit Profile | Nexus Market" />

      <div className="w-full flex flex-col mb-40">
        <Breadcrumbs
          title="Edit Profile"
          section1="Home"
          path1="/"
          section2="Account"
          path2="/account"
          page="Explore"
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <UploadPhoto formState={formState} setFormState={setFormState} />

            <EditInfo formState={formState} setFormState={setFormState} />
          </div>
        </div>
      </div>
    </>
  );
}
