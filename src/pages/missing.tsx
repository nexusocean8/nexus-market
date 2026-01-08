import { NavLink } from 'react-router-dom';
import { Metadata } from '../components/Metadata';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Home, Search } from 'lucide-react';

export default function Missing() {
  return (
    <>
      <Metadata title="Not Found | Nexus Market" />

      <Breadcrumbs title="404" section1="Home" path1="/" page="Not Found" />

      <div className="w-full flex flex-col min-h-screen px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-[var(--color-text)] mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-xl text-[var(--color-text-secondary)] mb-8">
            Something seems to be missing. The page you're looking for might
            have been moved or doesn't exist.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NavLink
              to="/"
              className="px-8 py-3 bg-gradient-purple hover:opacity-90 text-white rounded-xl font-semibold shadow-lg shadow-ink/30 transition-all duration-200 flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </NavLink>

            <NavLink
              to="/explore"
              className="px-8 py-3 border-2 border-ink text-ink hover:bg-gradient-purple hover:text-white hover:border-transparent rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>Explore NFTs</span>
            </NavLink>
          </div>

          {/* Decorative elements */}
          <div className="relative mt-16">
            <div className="absolute left-1/2 -translate-x-1/2 w-64 h-64 bg-ink rounded-full opacity-10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}
