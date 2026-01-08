export const CreateAndSell = () => {
  const steps = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: 'Set Up Your Wallet',
      description:
        'Wallet is an e-purse for NFT purchasing. You may have it-Coinbase account or the point, but very few are required to create new account.',
      color: 'bg-gradient-purple',
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      title: 'Create Your Collection',
      description:
        'Setting up your NFT Collection and creating NFTs on NFTs is easy. This guide explains how to set up your first NFT collection.',
      color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      title: 'Add Your NFTs',
      description:
        'Post a paragraph or 2 an anime sale notice either at first guideline, according to ecommerce Momentum, Blockchain minimum.',
      color: 'bg-gradient-purple',
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: 'List Them For Sale',
      description:
        'Choose between auctions, fixed-price listings, and declining price listings. You choose how you want to sell your NFTs.',
      color: 'bg-gradient-to-br from-rose-500 to-pink-600',
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-slate-darker">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-text-light dark:text-text-dark mb-16">
          Create & Sell Your NFTs
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-surface-light dark:bg-slate-mid rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-ink dark:hover:border-lavender-400">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center text-white mb-6 shadow-lg`}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
                  {step.title}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-purple text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-ink/20">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
