/* eslint-disable react-hooks/set-state-in-effect */
import { createNonce, verifyLogin } from '@/services/auth';
import { useDisconnect } from '@reown/appkit/react';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { useAccount, useSignMessage } from 'wagmi';

interface AuthContextType {
  isSigned: boolean;
  isAuthenticated: boolean;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  completeSignature: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isSigned: false,
  isAuthenticated: false,
  handleLogin: async () => {},
  handleLogout: async () => {},
  completeSignature: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const { signMessage, data: signature } = useSignMessage();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  useEffect(() => {
    const token = localStorage.getItem('nexus.token');

    setIsAuthenticated(!!token);
  }, []);

  const completeSignature = useCallback(async () => {
    const signature = localStorage.getItem('nexus.signature');

    if (!address || signature) return;

    try {
      const { message } = await createNonce(address);

      if (message) {
        signMessage({ message });

        setIsSigned(true);
        localStorage.setItem('nexus.signature', 'true');

        return;
      }
    } catch (error) {
      setIsSigned(false);
      toast.error('Signature Failed!');
      console.error('Signature failed:', error);
    }
  }, [address, signMessage]);

  const handleLogin = useCallback(async () => {
    if (!address || !signature) return;

    try {
      const { token } = await verifyLogin(address, signature);

      if (token) {
        setIsAuthenticated(true);
        localStorage.setItem('nexus.token', token);

        toast.success('Welcome to Nexus!');
      }
    } catch (error) {
      setIsSigned(false);
      setIsAuthenticated(false);
      localStorage.removeItem('nexus.token');
      localStorage.removeItem('nexus.signature');
      toast.error('Login Failed!');
      console.error('Login failed:', error);
    }
  }, [address, signature]);

  const handleLogout = useCallback(async () => {
    await disconnect();

    setIsSigned(false);
    setIsAuthenticated(false);
    localStorage.removeItem('nexus.token');
    localStorage.removeItem('nexus.signature');
  }, [disconnect]);

  return (
    <AuthContext.Provider
      value={{
        isSigned,
        isAuthenticated,
        handleLogin,
        handleLogout,
        completeSignature,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
