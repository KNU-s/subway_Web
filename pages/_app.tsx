import Layout from '@/components/Layout';
import { LineProvider } from '@/context/LineContext';
import '@/styles/index.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>열차영차</title>
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/logo192.png' />
        <meta charSet='UTF-8' />
        <meta name='description' content='실시간 지하철 위치 확인 웹 서비스' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#f5f5f5' />
      </Head>
      <LineProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LineProvider>
    </>
  );
};

export default App;
