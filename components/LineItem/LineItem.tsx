import { Line } from '@/types/line';
import Link from 'next/link';

type LineItemProps = {
  line: Line;
};

const LineItem = ({ line }: LineItemProps) => {
  const lineItemClassName = `line-item line-item__${line.lineId}`;
  return (
    <Link href={`/line/${line.lineUrlId}`}>
      <div className={lineItemClassName}>
        {line.lineFullName}
        <div className={`line-item__thumb`} />
      </div>
    </Link>
  );
};

export default LineItem;
