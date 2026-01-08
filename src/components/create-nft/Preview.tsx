import { Heart } from 'lucide-react';
import { Button } from '../Button';
import { NFTType } from '@/types';

interface Props {
  preview: string | null;
  nftType: NFTType | string;
}

export const Preview = ({ preview, nftType }: Props) => {
  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 mb-8">
      <div className="relative">
        <h2 className="mb-6 font-bold text-2xl md:text-3xl leading-[42px]">
          Item Preview
        </h2>

        <div className="relative w-[315px] h-[461px] rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-2xl hover:shadow-ink/20 transition-all duration-300 hover:-translate-y-2 hover:border-ink">
          {/* Media */}
          <div className="absolute w-[275px] h-[269px] top-[19px] left-[19px]">
            {nftType === 'Image' && preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
                onContextMenu={(e) => e.preventDefault()}
              />
            )}

            {!preview && (
              <img
                src="/images/car-1.jpg"
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            )}

            {nftType === 'Video' && preview && (
              <div className="relative w-full h-full rounded-xl bg-slate-darker flex items-center justify-center">
                <video
                  src={preview}
                  className="w-full h-full object-cover rounded-xl opacity-70 absolute z-10"
                  preload="metadata"
                  muted
                  playsInline
                  controlsList="nodownload noremoteplayback noplaybackrate"
                  onContextMenu={(e) => e.preventDefault()}
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <svg
                      className="w-6 h-6 text-slate-darker ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="absolute w-[269px] top-[300px] left-[19px]">
            <h3 className="text-xl font-bold text-[var(--color-text)] truncate">
              My NFT
            </h3>

            {/* Price and Likes */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <img src="/images/eth-icon.png" alt="ETH" className="h-6" />
                <span className="font-bold text-[var(--color-text)]">
                  1 ETH
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-purple rounded-lg shadow-lg shadow-ink/30">
                <Heart className="w-5 h-5 text-white" fill="white" />
                <span className="font-bold text-white">100</span>
              </div>
            </div>
          </div>

          {/* View Button */}
          <div className="absolute w-[270px] top-[388px] left-[19px]">
            <Button
              type="button"
              onClick={() => {}}
              className="bg-gradient-purple hover:opacity-90 shadow-lg shadow-ink/30"
              text="View NFT"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
