import { Header } from '@/components/Header';
import useWebSocket from '@/hooks/useWebSocket';
import { getLineInfo } from '@/services/stationInfo';
import { Line } from '@/types/line';
import { Train } from '@/types/train';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type LineDetailPageProps = {
  lineInfo: Line[];
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const lineInfo = await getLineInfo();
    return { props: { lineInfo: lineInfo } };
  } catch (error) {
    console.error('Error fetching line info:', error);
    return { props: { lineInfo: [] } };
  }
};

const LineDetailPage = ({ lineInfo }: LineDetailPageProps) => {
  const router = useRouter();
  const [lineName, setLineName] = useState<string | null>(null);
  const [trainList, setTrainList] = useState<Train[]>([]);
  const [message, loading] = useWebSocket(lineName || '');

  useEffect(() => {
    if (typeof router.query.lineName === 'string') {
      setLineName(router.query.lineName);
    }
  }, [router]);

  return (
    <div className="line-detail">
      {lineName ? (
        <Header title={lineName} showBackButton />
      ) : (
        <Header title="상세 노선" showBackButton />
      )}
      {loading && '정보를 불러오는 중입니다. 잠시만 기다려 주세요.'}
    </div>
  );
};

export default LineDetailPage;
