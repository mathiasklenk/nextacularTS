import { ThemeProvider } from 'next-themes';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import TopBarProgress from 'react-topbar-progress-indicator';
import { SWRConfig } from 'swr';

import { SessionProvider } from 'next-auth/react';
import progressBarConfig from '../config/progress-bar/index';
import swrConfig from '../config/swr';
import WorkspaceProvider from '../providers/workspace';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
  const [progress, setProgress] = useState(false);
  const router = useRouter();
  const swrOptions = swrConfig();

  Router.events.on('routeChangeStart', () => setProgress(true));
  Router.events.on('routeChangeComplete', () => setProgress(false));
  TopBarProgress.config(progressBarConfig());

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ReactGA.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={swrOptions}>
        <ThemeProvider attribute="class">
          <WorkspaceProvider>
            {progress && <TopBarProgress />}
            <Component {...pageProps} />
          </WorkspaceProvider>
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
};

export default App;
