export const TrendingNFTs = () => {
  // Placeholder data - replace with actual props/data
  const trendingItems = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
      title: 'Cosmic Dreams',
      price: '2.5 ETH',
      creator: 'Artist1',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400',
      title: 'Digital Waves',
      price: '1.8 ETH',
      creator: 'Artist2',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400',
      title: 'Neon City',
      price: '3.2 ETH',
      creator: 'Artist3',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400',
      title: 'Abstract Flow',
      price: '2.1 ETH',
      creator: 'Artist4',
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-surface-light dark:bg-slate-darker">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-text-light dark:text-text-dark">
            Trending NFTs
          </h2>
          <button className="px-6 py-3 bg-gradient-purple hover:opacity-90 text-white rounded-full font-semibold transition-all duration-200 shadow-lg shadow-ink/30">
            EXPLORE MORE
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-slate-mid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-ink dark:hover:border-lavender-400"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-darker/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Favorite Icon */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-slate-mid/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-slate-dark transition-colors">
                  <svg
                    className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-purple rounded-full"></div>
                  <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {item.creator}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-3">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between pt-3 border-t border-border-light dark:border-border-dark">
                  <div>
                    <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Current Price
                    </div>
                    <div className="text-sm font-bold text-ink dark:text-lavender-400">
                      {item.price}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-lavender-100 dark:bg-ink/20 text-ink dark:text-lavender-400 rounded-lg hover:bg-lavender-200 dark:hover:bg-ink/30 transition-colors text-sm font-semibold">
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
