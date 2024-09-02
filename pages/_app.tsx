import { LineProvider } from '@/context/LineContext';
import '@/styles/index.scss';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LineProvider>
      <Component {...pageProps} />
    </LineProvider>
  );
};

export default App;
