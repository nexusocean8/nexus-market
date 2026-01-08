import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Results } from '@/components/explore/Results';
import { Sort } from '@/components/explore/Sort';
import { Metadata } from '@/components/Metadata';
import { ExploreNFTs, INFT } from '@/types';
import { useState } from 'react';
import { Filter } from '@/components/explore/Filter';
import { Divide } from '@/components/explore/Divide';
import { Status } from '@/components/explore/Status';
import { Category } from '@/components/explore/Category';
import { Type } from '@/components/explore/Type';

// Mock data
const mockNFTs: INFT[] = [
  {
    _id: '1',
    creator: '0xABC123...',
    owner: '0xDEF456...',
    contract: '0x123',
    tokenId: 432,
    pairId: 1,
    network: 'Base Sepolia',
    name: 'Cosmic Dreams #432',
    description: 'A stunning cosmic artwork',
    metadata: {},
    nftType: 'Image',
    category: 'Art',
    ipfs: 'ipfs://...',
    media: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400',
    price: 2.5,
    royalties: 5,
    auction: true,
    listed: true,
    totalLikes: 245,
    hasLiked: false,
    sold: 0,
  },
  {
    _id: '2',
    creator: '0xGHI789...',
    owner: '0xJKL012...',
    contract: '0x456',
    tokenId: 789,
    pairId: 2,
    network: 'Base Sepolia',
    name: 'Digital Waves',
    description: 'Abstract digital art',
    metadata: {},
    nftType: 'Image',
    category: 'Art',
    ipfs: 'ipfs://...',
    media: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400',
    price: 1.8,
    royalties: 5,
    auction: false,
    listed: true,
    totalLikes: 189,
    hasLiked: false,
    sold: 0,
  },
  {
    _id: '3',
    creator: '0xMNO345...',
    owner: '0xPQR678...',
    contract: '0x789',
    tokenId: 123,
    pairId: 3,
    network: 'Base Sepolia',
    name: 'Neon City',
    description: 'Cyberpunk cityscape',
    metadata: {},
    nftType: 'Image',
    category: 'Photo',
    ipfs: 'ipfs://...',
    media: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400',
    price: 3.2,
    royalties: 5,
    auction: true,
    listed: true,
    totalLikes: 312,
    hasLiked: false,
    sold: 0,
  },
];

export default function Explore() {
  const [searchFormState, setSearchFormState] = useState<ExploreNFTs>({
    search: '',
    skip: 0,
    limit: 6,
  });
  const [allNFTs] = useState<INFT[]>(mockNFTs);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic will be implemented later
  };

  return (
    <>
      <Metadata title="Explore | Nexus Market" />
      <div className="w-full flex flex-col mb-40">
        <Breadcrumbs title="Explore" section1="Home" path1="/" page="Explore" />

        <form
          onSubmit={handleSearch}
          className="flex w-full mx-auto px-4 sm:px-6 lg:px-8 mt-12 min-h-screen"
        >
          <aside className="hidden 2xl:block pr-12">
            <Filter
              formState={searchFormState}
              setFormState={setSearchFormState}
            />
            <Divide />
            <Status
              formState={searchFormState}
              setFormState={setSearchFormState}
            />
            <Divide />
            <Type
              formState={searchFormState}
              setFormState={setSearchFormState}
            />
            <Divide />
            <Category
              formState={searchFormState}
              setFormState={setSearchFormState}
            />
          </aside>

          <div className="flex-1">
            <Sort
              total={mockNFTs.length}
              length={allNFTs.length}
              setAllNFTs={() => {}}
              formState={searchFormState}
              setFormState={setSearchFormState}
            />
            <Results
              nfts={allNFTs}
              total={mockNFTs.length}
              isFetching={false}
              setFormState={setSearchFormState}
            />
          </div>
        </form>
      </div>
    </>
  );
}
