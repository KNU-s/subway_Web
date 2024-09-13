import { LineList } from '@/components/LineList';
import { getLineInfo } from '@/services/lineInfo';
import { Line } from '@/types/line';
import { GetStaticProps } from 'next';

type HomePageProps = {
  lineInfo: Line[];
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    // const { data: lineInfo } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/line`);
    const lineInfo = await getLineInfo();
    return { props: { lineInfo: lineInfo } };
  } catch (error) {
    console.error('Error fetching line info:', error);
    return { props: { lineInfo: [] } };
  }
};

const HomePage = ({ lineInfo }: HomePageProps) => {
  return (
    <div className='home'>
      <LineList lineInfo={lineInfo} />
    </div>
  );
};

export default HomePage;
