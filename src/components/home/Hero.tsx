import { NavLink } from 'react-router-dom';
import { Button } from '../Button';
import { Heart } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-lavender-100 via-lavender-200 to-lavender-300 dark:bg-gradient-hero">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-light dark:text-text-dark leading-tight">
              Nexus NFTs, The Next Generation Of Digital Assets
            </h1>

            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-xl">
              Experience the fusion of artistic talent and cutting-edge
              technology, as we showcase the best in NFT rarity and digital
              assets innovation
            </p>

            <div className="flex flex-wrap gap-4">
              <NavLink
                to="/explore"
                className="px-8 py-4 bg-gradient-purple hover:opacity-90 text-white rounded-full font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-ink/30 hover:shadow-ink/40"
              >
                Explore Nexus
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </NavLink>

              <NavLink
                to="/contact"
                className="px-8 py-4 bg-white dark:bg-slate-mid text-text-light dark:text-text-dark rounded-full font-semibold border-2 border-border-light dark:border-border-dark hover:border-ink dark:hover:border-lavender-400 transition-all duration-200"
              >
                Get Early Access
              </NavLink>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border-light dark:border-border-dark">
              <div>
                <div className="text-3xl font-bold text-text-light dark:text-text-dark">
                  0
                </div>
                <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  Creators
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-text-light dark:text-text-dark">
                  0
                </div>
                <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  Collections
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-text-light dark:text-text-dark">
                  0
                </div>
                <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  Creators
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured NFT Card */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl shadow-ink/20 hover:shadow-ink/30 hover:-translate-y-2 hover:border-ink transition-all duration-300">
              {/* Media */}
              <div className="p-8">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600"
                    alt="Featured NFT"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-[var(--color-text)] mb-4">
                  Cosmic Dreams #7823
                </h3>

                {/* Price and Likes */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img src="/images/eth-icon.png" alt="ETH" className="h-8" />
                    <span className="text-2xl font-bold text-[var(--color-text)]">
                      2.5 ETH
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-purple rounded-xl shadow-lg shadow-ink/30">
                    <Heart className="w-6 h-6 text-white" />
                    <span className="text-xl font-bold text-white">1,234</span>
                  </div>
                </div>

                {/* View Button */}
                <Button
                  type="button"
                  className="bg-gradient-purple hover:opacity-90 shadow-lg shadow-ink/30"
                  text="View NFT"
                />
              </div>

              {/* Decorative glow elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-ink rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-lavender-500 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
