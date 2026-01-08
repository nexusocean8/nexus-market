import { shortenAddress } from '@/utils/shortenAddress';
import { IUser } from '@/types';
import { toast } from 'react-toastify';
import { getAccount } from '@/services/user';
import { Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Copy, Edit, Globe, Plus } from 'lucide-react';
import { Metadata } from '../Metadata';

export const UserInfo = () => {
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<IUser>({
    queryKey: ['account'],
    queryFn: getAccount,
  });

  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address);
    toast.success('Wallet address copied!');
  };

  if (isLoading) return null;

  if (error || !user) return <Navigate to="/missing" />;

  return (
    <>
      <Metadata title="Account | Nexus Market" />

      <div className="left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Profile Card */}
        <div className="rounded-2xl bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-2xl overflow-hidden h-auto max-h-[600px]">
          {/* Cover Photo - Extended to ~50% of card height */}
          <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden ">
            <img
              src={user.cover}
              className="w-full h-full object-cover object-center"
              alt="cover photo"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 dark:to-black/40"></div>
          </div>

          {/* Profile Content Container */}
          <div className="relative px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8">
            {/* Profile Photo */}
            <div className="relative flex justify-center sm:justify-start -mt-20 lg:-mt-40 mb-4">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full ring-2 ring-background-dark dark:ring-background-light bg-background-light dark:bg-background-dark p-1">
                  <img
                    alt="profile photo"
                    src={user.photo}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Header Row with Stats and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              {/* Stats */}
              <div className="flex px-4 py-2 justify-center sm:justify-start gap-6 sm:gap-8">
                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-light dark:text-text-dark">
                    {user.followingCount || 0}
                  </div>
                  <div className="text-sm sm:text-base text-text-secondary-light dark:text-text-secondary-dark font-medium mt-1">
                    Following
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-light dark:text-text-dark">
                    {user.followersCount || 0}
                  </div>
                  <div className="text-sm sm:text-base text-text-secondary-light dark:text-text-secondary-dark font-medium mt-1">
                    Followers
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center sm:justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`/edit/profile`)}
                  className="w-11 h-11 sm:w-12 sm:h-12 bg-lavender-500 hover:bg-lavender-600 dark:bg-lavender-500 dark:hover:bg-lavender-600 rounded-xl transition-all duration-200 flex items-center justify-center group shadow-md"
                  aria-label="Edit profile"
                >
                  <Edit className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/create/nft`)}
                  className="w-11 h-11 sm:w-12 sm:h-12 bg-lavender-500 hover:bg-lavender-600 dark:bg-lavender-500 dark:hover:bg-lavender-600 rounded-xl transition-all duration-200 flex items-center justify-center group shadow-md"
                  aria-label="Create NFT"
                >
                  <Plus className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/profile/${user.address}`)}
                  className="w-11 h-11 sm:w-12 sm:h-12 bg-lavender-500 hover:bg-lavender-600 dark:bg-lavender-500 dark:hover:bg-lavender-600 rounded-xl transition-all duration-200 flex items-center justify-center group shadow-md"
                  aria-label="View public profile"
                >
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Username and Address */}
            <div className="max-w-3xl flex flex-col justify-center sm:justify-start space-y-1 mt-4">
              <h1 className="text-lg sm:text-xl lg:text-2xl px-4 font-bold text-text-light dark:text-text-dark">
                @{user.username}
              </h1>

              <button
                onClick={() => handleCopyAddress(user.address)}
                className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-lg hover:bg-ink/5 dark:hover:bg-lavender-500/10 transition-colors duration-200 group"
                aria-label="Copy wallet address"
              >
                <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-lavender-500 dark:text-lavender-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm sm:text-base lg:text-lg text-text-light dark:text-text-dark">
                  {shortenAddress(user.address)}
                </span>
              </button>

              {/* Website Link */}
              {user?.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-lg hover:bg-ink/5 dark:hover:bg-lavender-500/10 transition-colors duration-200 group"
                >
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-lavender-500 dark:text-lavender-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm sm:text-base lg:text-lg text-text-light dark:text-text-dark">
                    {user?.website?.replace(/https?:\/\//, '')}
                  </span>
                </a>
              )}

              {/* Bio */}
              {user?.bio && (
                <p className="px-4 text-sm sm:text-base lg:text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed text-left">
                  {user.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
