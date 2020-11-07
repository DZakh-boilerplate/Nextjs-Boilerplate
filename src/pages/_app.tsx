/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import Head from 'next/head';

import { useInitialStore, StoreProvider } from '@/models';

import '@/styles/main.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const $rootStore = useInitialStore(pageProps.initialState);

  return (
    <StoreProvider store={$rootStore}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default App;
