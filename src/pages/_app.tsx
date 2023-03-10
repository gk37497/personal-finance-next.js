import { AuthContextProvider } from '@/context/AuthContext';
import { ManagedUIContext } from '@/context/UiContext';

import '@/styles/globals.css';

import { IBM_Plex_Sans } from '@next/font/google';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';

// Initialize IBM_Plex_Mono font
const ibm = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: '400',
});

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>;

const noAuthRequired = ['/', '/login', '/signup'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout = (Component as any).Layout || Noop;
  return (
    <ManagedUIContext>
      <AuthContextProvider>
        <main className={ibm.className}>
          <Layout pageProps={pageProps}>
            {noAuthRequired.includes(router.pathname) ? (
              <Component {...pageProps} />
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </main>
      </AuthContextProvider>
    </ManagedUIContext>
  );
}
