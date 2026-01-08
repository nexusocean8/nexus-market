import { Hero } from '@/components/home/Hero';
import { CreateAndSell } from '@/components/home/CreateAndSell';
import { TrendingNFTs } from '@/components/home/TrendingNFTs';
import { NewCollections } from '@/components/home/NewCollections';
import { LiveAuction } from '@/components/home/LiveAuction';
import { Metadata } from '@/components/Metadata';

export default function Home() {
  return (
    <>
      <Metadata title="Nexus Market | Digital Asset Marketplace" />

      <div className="w-full flex flex-col">
        <Hero />
        <CreateAndSell />
        <TrendingNFTs />
        <NewCollections />
        <LiveAuction />
      </div>
    </>
  );
}
