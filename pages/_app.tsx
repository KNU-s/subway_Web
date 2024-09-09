import { Layout } from '@/components/Layout';
import { LineProvider } from '@/context/LineContext';
import '@/styles/index.scss';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LineProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LineProvider>
  );
};

export default App;
