/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/auth';
import { useTheme } from '@/context/theme';
import { Overlay } from '@/components/Overlay';
import { useAppKit, useDisconnect } from '@reown/appkit/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Moon, Sun, Wallet } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { info } from '@/utils/toast';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [connected, setConnected] = useState<boolean>(false);
  const {
    handleLogin,
    handleLogout,
    completeSignature,
    isAuthenticated,
    isSigned,
  } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme() || {};
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const { open } = useAppKit();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignature = useCallback(async () => {
    try {
      await completeSignature();
    } catch (err) {
      console.log(err);
      disconnect();
    }
  }, [completeSignature, disconnect]);

  const handleSignIn = useCallback(async () => {
    try {
      await handleLogin();
    } catch (err) {
      console.log(err);
    }
  }, [handleLogin]);

  const handleSignOut = useCallback(async () => {
    await handleLogout();

    queryClient.clear();

    setConnected(false);
    info('You have been signed out.');
  }, [handleLogout, queryClient]);

  useEffect(() => {
    if (isConnected && !isSigned && !isAuthenticated && !connected) {
      setConnected(true);
      handleSignature();
    }
  }, [connected, handleSignature, isAuthenticated, isConnected, isSigned]);

  useEffect(() => {
    if (isConnected && isSigned && !isAuthenticated && connected) {
      handleSignIn();
    }
  }, [connected, handleSignIn, isAuthenticated, isConnected, isSigned]);

  useEffect(() => {
    if (isConnected && isAuthenticated && connected) {
      setConnected(false);
    }
  }, [isConnected, isAuthenticated, connected]);

  useEffect(() => {
    const signature = localStorage.getItem('nexus.signature');

    if (!isConnected && signature) {
      handleSignOut();
    }
  }, [handleSignOut, isConnected]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/explore' },
    { label: 'Account', href: '/account' },
  ];

  const handleMobileNav = (link: string) => {
    navigate(link);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-darker/80 border-b border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="hover-opacity flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ">
              <img src="/images/logo.webp" />
            </div>
            <NavLink
              to="/"
              onClick={() => handleMobileNav('/')}
              className="text-2xl font-bold text-text-light dark:text-text-dark"
            >
              Nexus Market
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-ink dark:hover:text-lavender-400 font-semibold transition-colors"
              >
                {link.label}
              </NavLink>
            ))}

            {isConnected && (
              <NavLink
                to="create/nft"
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-ink dark:hover:text-lavender-400 font-semibold transition-colors"
              >
                Create
              </NavLink>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-ink dark:hover:text-lavender-400 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-surface-dark"
            >
              {isDark ? (
                <Moon className="w-7 h-7" />
              ) : (
                <Sun className="w-7 h-7" />
              )}
            </button>

            {/* Connect Wallet */}
            <button
              onClick={() => open()}
              type="button"
              className="px-6 py-2.5 flex items-center gap-2 bg-gradient-purple hover:opacity-90 text-white rounded-full font-semibold transition-all shadow-lg shadow-ink/30 hover:shadow-ink/40"
            >
              <span>{!isConnected ? 'Connect' : 'Disconnect'}</span>
              <Wallet className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-light dark:text-text-dark rounded-lg hover:bg-gray-200 dark:hover:bg-surface-dark transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-light dark:border-border-dark w-full">
            <nav className="flex flex-col gap-4 w-1/2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleMobileNav(link.href)}
                  className="text-left text-text-secondary-light dark:text-text-secondary-dark hover:text-ink dark:hover:text-lavender-400 font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}

              {isConnected && (
                <button
                  type="button"
                  onClick={() => handleMobileNav('/create/nft')}
                  className="text-left text-text-secondary-light dark:text-text-secondary-dark hover:text-ink dark:hover:text-lavender-400 font-medium transition-colors"
                >
                  Create
                </button>
              )}

              <button
                onClick={toggleTheme}
                className="my-2 flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-ink dark:hover:text-lavender-400 font-medium transition-colors"
              >
                {isDark ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
                <span>Toggle Theme</span>
              </button>
              <button
                onClick={() => open()}
                className="px-4 py-2 flex items-center text-center justify-center gap-2 bg-gradient-purple hover:opacity-90 text-white rounded-full font-semibold transition-all shadow-lg shadow-ink/30 hover:shadow-ink/40"
              >
                <span>{!isConnected ? 'Connect' : 'Disconnect'}</span>
                <Wallet className="w-5 h-5" />
              </button>
            </nav>
          </div>
        )}
      </div>

      {connected && <Overlay setIsOpen={() => disconnect()} />}
    </header>
  );
};
