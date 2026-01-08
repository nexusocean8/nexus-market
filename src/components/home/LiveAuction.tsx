export const LiveAuction = () => {
  const auctions = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400',
      title: 'Moonlight Collection #432',
      currentBid: '4.5 ETH',
      creator: 'MoonArtist',
      timeLeft: { hours: 5, minutes: 23, seconds: 45 },
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400',
      title: 'Genesis Avatar',
      currentBid: '3.8 ETH',
      creator: 'PixelMaster',
      timeLeft: { hours: 12, minutes: 8, seconds: 30 },
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400',
      title: 'Neon Dreams',
      currentBid: '6.2 ETH',
      creator: 'NeonCreator',
      timeLeft: { hours: 2, minutes: 45, seconds: 12 },
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400',
      title: 'Digital Landscape',
      currentBid: '5.1 ETH',
      creator: 'LandscapeNFT',
      timeLeft: { hours: 8, minutes: 15, seconds: 52 },
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-surface-light dark:bg-slate-darker">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-text-light dark:text-text-dark">
            Live Auctions
          </h2>
          <button className="px-6 py-3 bg-gradient-purple hover:opacity-90 text-white rounded-full font-semibold transition-all duration-200 shadow-lg shadow-ink/30">
            EXPLORE MORE
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {auctions.map((auction) => (
            <div
              key={auction.id}
              className="group bg-white dark:bg-slate-mid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-ink dark:hover:border-lavender-400"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-darker/80 via-slate-darker/20 to-transparent"></div>

                {/* Live Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  LIVE
                </div>

                {/* Countdown Timer */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-slate-darker/90 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-xs text-text-secondary-dark mb-1">
                      Auction Ends In
                    </div>
                    <div className="flex gap-2 text-white">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">
                          {auction.timeLeft.hours}h
                        </span>
                      </div>
                      <span className="text-lg">:</span>
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">
                          {auction.timeLeft.minutes}m
                        </span>
                      </div>
                      <span className="text-lg">:</span>
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">
                          {auction.timeLeft.seconds}s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2 truncate">
                  {auction.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-purple rounded-full"></div>
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    {auction.creator}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border-light dark:border-border-dark">
                  <div>
                    <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Current Bid
                    </div>
                    <div className="text-base font-bold text-ink dark:text-lavender-400">
                      {auction.currentBid}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-purple hover:opacity-90 text-white rounded-lg transition-all text-sm font-semibold shadow-lg shadow-ink/30">
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
