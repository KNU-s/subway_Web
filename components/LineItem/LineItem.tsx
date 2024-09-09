import { Line } from '@/types/line';
import Link from 'next/link';

type LineItemProps = {
  line: Line;
};

const LineItem = ({ line }: LineItemProps) => {
  const encodedLineFullName = encodeURIComponent(line.lineFullName);
  return (
    <Link href={`/line/${encodedLineFullName}`}>
      <div className={`line-item line-item__${line.lineId}`}>
        {line.lineFullName}
        <div className={`line-item__thumb`} />
      </div>
    </Link>
  );
};

export default LineItem;
