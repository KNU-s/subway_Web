import lineNameToIdMap from '@/data/lineNameToIdMap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useLineId = () => {
  const router = useRouter();
  const [lineId, setLineId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof router.query.lineName === 'string') {
      const lineName = router.query.lineName;
      if (lineName) {
        for (const [key, value] of Object.entries(lineNameToIdMap)) {
          if (lineName.includes(key)) {
            setLineId(value);
          }
        }
      }
    }
  }, [router.query.lineName]);

  return lineId;
};

export default useLineId;
