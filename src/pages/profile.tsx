import { Menu } from '@/components/profile/Menu';
import { AuthorInfo } from '@/components/profile/AuthorInfo';
import { useState } from 'react';
import { Creations } from '@/components/profile/Creations';
import { Collections } from '@/components/profile/Collections';
import { Likes } from '@/components/profile/Likes';
import { Navigate, useParams } from 'react-router-dom';
import { Assets } from '@/components/profile/Assets';

export default function Profile() {
  const [selected, setSelected] = useState<number>(1);
  const { address } = useParams();

  if (!address) return <Navigate to="/not-found" />;

  return (
    <div className="w-full min-h-screen bg-background dark:bg-background">
      {/* Hero Background Section with UserInfo */}
      <div className="relative justify-start w-full h-48 md:h-64 lg:h-80 pt-4 bg-gradient-hero overflow-visible">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-ink rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lavender-500 rounded-full blur-3xl" />
        </div>
        {/* UserInfo - Positioned at bottom of hero, extending beyond */}

        <AuthorInfo creator={address} />
      </div>
      {/* Main Content Container - Add top padding to account for UserInfo overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-[400px]">
        {/* Navigation Menu */}
        <div className="relative z-10 my-8">
          <Menu selected={selected} setSelected={setSelected} />
        </div>
        {/* Content Area */}
        <div className="relative z-10">
          <div className="bg-surface dark:bg-surface rounded-2xl border-border dark:border-border p-6 md:p-8 min-h-[500px]">
            {selected === 1 && <Assets selected={selected} creator={address} />}
            {selected === 2 && (
              <Creations selected={selected} creator={address} />
            )}
            {selected === 3 && (
              <Collections selected={selected} creator={address} />
            )}
            {selected === 4 && <Likes selected={selected} creator={address} />}
          </div>
        </div>
      </div>
    </div>
  );
}
