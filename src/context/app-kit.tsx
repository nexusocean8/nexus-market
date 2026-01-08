import type { ReactNode } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { inkSepolia } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'wagmi';

const projectId = import.meta.env.VITE_PROJECT_ID as string;

const INK_SEPOLIA_RPC = import.meta.env.VITE_SEPOLIA_RPC as string;

const metadata = {
  name: 'Nexus',
  description: 'Nexus: NFT Marketplace',
  url: 'https://nexusocean.link',
  icons: ['https://nexusocean.link/images/logo.webp'],
};

const wagmiAdapter = new WagmiAdapter({
  networks: [inkSepolia],
  transports: {
    [inkSepolia.id]: http(INK_SEPOLIA_RPC),
  },
  projectId,
  ssr: false,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [inkSepolia],
  metadata,
  projectId,
  features: {
    analytics: true,
    swaps: false,
    email: false,
    socials: false,
  },
  featuredWalletIds: [
    '18450873727504ae9315a084fa7624b5297d2fe5880f0982979c17345a138277',
    'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',
    '18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1',
  ],
  coinbasePreference: 'eoaOnly',
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'Plus Jakarta Sans',
    '--w3m-accent': '#a78bfa', // lighter lavender instead of dark ink
    '--w3m-color-mix': '#d1d5db', // gray-300 for much lighter surfaces
    '--w3m-color-mix-strength': 15,
    '--w3m-border-radius-master': '12px',
  },
  privacyPolicyUrl: 'https://nexusocean.link/privacy-policy',
  termsConditionsUrl: 'https://nexusocean.link/terms-of-service',
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      gcTime: 15 * 60 * 1000,
    },
  },
});

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
