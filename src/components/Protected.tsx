import { ReactNode, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/auth';
import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import { Navigate } from 'react-router-dom';

export const Protected = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isSigned } = useContext(AuthContext);
  const { isConnected } = useAccount();
  const { open } = useAppKit();

  useEffect(() => {
    if (!isAuthenticated && !isSigned && !isConnected) {
      open();
    }
  }, [isAuthenticated, isSigned, isConnected, open]);

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default Protected;
