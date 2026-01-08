import { Button } from './Button';
import { Heart } from 'lucide-react';
import { INFT } from '@/types';
import { useState } from 'react';
import { ListItem } from './account/ListItem';
import { Overlay } from './Overlay';
import { UnlistItem } from './account/UnlistItem';
import { formatNumber } from '@/utils/validations';
import { ButtonLine } from './ButtonLine';
import { useNavigate } from 'react-router-dom';

interface Props {
  nft: INFT;
}

export const NFTListing = ({ nft }: Props) => {
  const {
    contract,
    media,
    name,
    totalLikes,
    price,
    listed,
    tokenId,
    pairId,
    nftType,
  } = nft;
  const [isListing, setIsListing] = useState<boolean>(false);
  const [isUnlisting, setIsUnlisting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleListing = (listed: boolean) => {
    if (!listed) {
      setIsListing(true);
    } else {
      setIsUnlisting(true);
    }
  };

  return (
    <>
      <div className="relative m-8 w-[307px] h-[461px] rounded-[10px] bg-[#1a1a2e] nft-listing">
        <>
          {nftType === 'Image' && (
            <div className="absolute w-[269px] h-[269px] top-[19px] left-[19px] bg-[#1a1a2e] rounded-[10px] flex items-center justify-center">
              <img
                src={media}
                alt={name}
                className="w-full h-full object-cover rounded-[10px]"
                loading="lazy"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          )}

          {nftType === 'Video' && (
            <div
              className={`absolute w-[269px] h-[269px] top-[19px] left-[19px] rounded-[10px] bg-black flex items-center justify-center`}
            >
              <div className="relative w-full h-full">
                <video
                  src={media}
                  className="w-full h-full object-cover rounded-[10px] opacity-70 absolute z-10"
                  preload="metadata"
                  muted
                  playsInline
                  controlsList="nodownload noremoteplayback noplaybackrate"
                  onContextMenu={(e) => e.preventDefault()}
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#f3f4f6] bg-opacity-80 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-black ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
        <div className="relative w-[269px] h-[26px] top-[300px] left-[19px]">
          <div className="left-0 text-2xl text-[#f3f4f6] leading-[var(--title-small-line-height)] whitespace-nowrap absolute top-0 font-title-small font-[number:var(--title-small-font-weight)] tracking-[var(--title-small-letter-spacing)] [font-style:var(--title-small-font-style)]">
            {name.length > 20 ? `${name.substring(0, 20)}...` : name}
          </div>

          <div className="absolute flex flex-row top-10 left-0 font-title-small font-[number:var(--title-small-font-weight)] text-[#f3f4f6] text-[length:var(--title-small-font-size)] tracking-[var(--title-small-letter-spacing)] leading-[var(--title-small-line-height)] whitespace-nowrap [font-style:var(--title-small-font-style)]">
            <div className="flex items-center gap-2 mr-auto w-[169px]">
              <img
                src="/images/eth-icon.png"
                alt="ETH"
                className="h-[24px] mr-2"
              />

              <span>{formatNumber(price)} ETH</span>
            </div>

            <div className="block p-1 w-[100px] h-[30px] bg-[#684C5C] rounded-[10px] ml-auto">
              <div className="flex justify-around items-center h-full">
                <Heart className="w-[28px] mr-2" color="#f3f4f6" />
                <span className="mr-auto font-bold text-[#f3f4f6]">
                  {totalLikes > 1000
                    ? `1,000+`
                    : totalLikes?.toLocaleString() || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-[270px] h-[46px] top-[388px] left-[19px]">
          {listed ? (
            <>
              <ButtonLine
                type="button"
                onClick={() => handleListing(listed)}
                className="hover-opacity !text-white !rounded-[10px] !gap-[10px] !justify-center !px-[32.64px] !py-[13.99px] !flex !absolute !w-5/12 left-0"
                text="Unlist"
              />

              <Button
                type="button"
                onClick={() => navigate(`/nft/${contract}/${tokenId}`)}
                className="hover-opacity bg-[#684C5C] !rounded-[10px] !gap-[10px] !justify-center !px-[32.64px] !py-[13.99px] !flex !absolute !w-5/12 right-0"
                text="View"
              />
            </>
          ) : (
            <>
              <ButtonLine
                type="button"
                onClick={() => handleListing(listed)}
                className="hover-opacity !text-white !rounded-[10px] !gap-[10px] !justify-center !px-[32.64px] !py-[13.99px] !flex !absolute !w-5/12 left-0"
                text="List"
              />

              <Button
                type="button"
                onClick={() => navigate(`/nft/${contract}/${tokenId}`)}
                className="hover-opacity bg-[#684C5C] !rounded-[10px] !gap-[10px] !justify-center !px-[32.64px] !py-[13.99px] !flex !absolute !w-5/12 right-0"
                text="View"
              />
            </>
          )}
        </div>
      </div>

      {isListing && (
        <>
          <ListItem
            name={name}
            contract={contract}
            tokenId={tokenId}
            pairId={pairId}
            setIsOpen={() => setIsListing(false)}
          />
          <Overlay setIsOpen={() => setIsListing(false)} />
        </>
      )}

      {isUnlisting && (
        <>
          <UnlistItem
            name={name}
            contract={contract}
            tokenId={tokenId}
            pairId={pairId}
            setIsOpen={() => setIsUnlisting(false)}
          />
          <Overlay setIsOpen={() => setIsUnlisting(false)} />
        </>
      )}
    </>
  );
};
