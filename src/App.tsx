import { lazy } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import { Layout } from './layout';
import { AuthProvider } from './context/auth';
import { AppKitProvider } from './context/app-kit';
import { ThemeProvider } from './context/theme';
import CreateCollection from './pages/create-collection';
import CreateNFT from './pages/create-nft';

const Home = lazy(() => import('@/pages/home'));
const Explore = lazy(() => import('@/pages/explore'));
const Profile = lazy(() => import('@/pages/profile'));
const Contact = lazy(() => import('@/pages/contact'));

const Missing = lazy(() => import('@/pages/missing'));
const Protected = lazy(() => import('@/components/Protected'));

const Account = lazy(() => import('@/pages/account'));
const EditProfile = lazy(() => import('@/pages/edit-profile'));

function Root() {
  return (
    <ThemeProvider>
      <AppKitProvider>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/profile/:address" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />

              <Route
                path="/account"
                element={
                  <Protected>
                    <Account />
                  </Protected>
                }
              />

              <Route
                path="/edit/profile"
                element={
                  <Protected>
                    <EditProfile />
                  </Protected>
                }
              />

              <Route
                path="/create/collection"
                element={
                  <Protected>
                    <CreateCollection />
                  </Protected>
                }
              />

              <Route
                path="/create/nft"
                element={
                  <Protected>
                    <CreateNFT />
                  </Protected>
                }
              />

              <Route path="/missing" element={<Missing />} />
              <Route path="*" element={<Navigate to="/missing" replace />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </AppKitProvider>
    </ThemeProvider>
  );
}

const router = createBrowserRouter([{ path: '*', element: <Root /> }]);

export default function App() {
  return <RouterProvider router={router} />;
}
