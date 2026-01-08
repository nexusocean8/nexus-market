import { Bounce, ToastContainer } from 'react-toastify';
import { ReactNode, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/layout/Header';
import { Footer } from '@/layout/Footer';
import { Loading } from '@/components/Loading';
import { useTheme } from '@/context/theme';
import { ScrollToTop } from '@/components/ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const { isDark } = useTheme() || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="bg-surface-light dark:bg-slate-darker text-text-light dark:text-text-dark min-h-screen w-screen overflow-x-hidden">
      <Header />
      <main className="min-h-screen w-screen pt-20">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss={false}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        rtl={false}
        theme={isDark ? 'dark' : 'light'}
        transition={Bounce}
      />

      <ScrollToTop />
    </div>
  );
};
