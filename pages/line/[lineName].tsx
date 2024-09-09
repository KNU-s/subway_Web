import { Header } from '@/components/Header';
import Map from '@/components/Map';
import useWebSocket from '@/hooks/useWebSocket';
import { Line } from '@/types/line';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type LineDetailPageProps = {
  lineInfo: Line | null;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (params && typeof params.lineName === 'string') {
      const { data: lineInfo } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/line/${params.lineName}`,
      );
      return { props: { lineInfo } };
    }
    return { props: { lineInfo: null } };
  } catch (error) {
    console.error('Error fetching line info:', error);
    return { props: { lineInfo: null } };
  }
};

const LineDetailPage = ({ lineInfo }: LineDetailPageProps) => {
  const router = useRouter();
  const [lineName, setLineName] = useState<string | null>(null);
  const [message, loading] = useWebSocket(lineName || '');

  useEffect(() => {
    if (typeof router.query.lineName === 'string') {
      setLineName(router.query.lineName);
    }
  }, [router]);

  return (
    <div className='line-detail'>
      <Header showBackButton />
      {/* {loading && '정보를 불러오는 중입니다. 잠시만 기다려 주세요.'} */}
      {lineInfo && <Map stationList={lineInfo.stations} trainInfo={message} />}
    </div>
  );
};

export default LineDetailPage;
