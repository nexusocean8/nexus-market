export const NewCollections = () => {
  const collections = [
    {
      id: 1,
      banner:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      name: 'Cyber Punks',
      creator: 'CyberArtist',
      items: 245,
      verified: true,
    },
    {
      id: 2,
      banner:
        'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      name: 'Abstract Dreams',
      creator: 'DreamMaker',
      items: 189,
      verified: true,
    },
    {
      id: 3,
      banner:
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      name: 'Digital Nature',
      creator: 'NatureNFT',
      items: 312,
      verified: false,
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-slate-darker">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-text-light dark:text-text-dark">
            Recent Collections
          </h2>
          <button className="px-6 py-3 bg-gradient-purple hover:opacity-90 text-white rounded-full font-semibold transition-all duration-200 shadow-lg shadow-ink/30">
            EXPLORE MORE
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group bg-surface-light dark:bg-slate-mid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-ink dark:hover:border-lavender-400"
            >
              {/* Banner */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={collection.banner}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-darker/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                {/* Avatar */}
                <div className="absolute -top-10 left-6">
                  <div className="w-20 h-20 rounded-full border-4 border-surface-light dark:border-slate-mid overflow-hidden shadow-lg">
                    <img
                      src={collection.avatar}
                      alt={collection.creator}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="mt-12">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
                      {collection.name}
                    </h3>
                    {collection.verified && (
                      <svg
                        className="w-5 h-5 text-ink dark:text-lavender-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    by{' '}
                    <span className="font-semibold">{collection.creator}</span>
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border-light dark:border-border-dark">
                    <div>
                      <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        Items
                      </div>
                      <div className="text-lg font-bold text-text-light dark:text-text-dark">
                        {collection.items}
                      </div>
                    </div>
                    <button className="px-5 py-2 bg-gradient-purple hover:opacity-90 text-white rounded-lg transition-colors font-semibold text-sm shadow-md shadow-ink/20">
                      View Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
