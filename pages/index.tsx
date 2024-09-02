import { Header } from '@/components/Header';
import { LineList } from '@/components/LineList';
import { getLineInfo } from '@/services/stationInfo';
import { Line } from '@/types/line';
import { GetServerSideProps } from 'next';

type HomePageProps = {
  lineInfo: Line[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const lineInfo = await getLineInfo();
    return { props: { lineInfo: lineInfo } };
  } catch (error) {
    console.error('Error fetching line info:', error);
    return { props: { lineInfo: [] } };
  }
};

const HomePage = ({ lineInfo }: HomePageProps) => {
  return (
    <div className="home">
      <Header />
      <LineList />
    </div>
  );
};

export default HomePage;
