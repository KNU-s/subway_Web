import { Line } from '@/types/line';
import Link from 'next/link';

type LineItemProps = {
  line: Line;
};

const LineItem = ({ line }: LineItemProps) => {
  const encodedLineFullName = encodeURIComponent(line.lineFullName);
  const lineItemClassName = `line-item line-item__${line.lineId}`;
  return (
    <Link href={`/line/${encodedLineFullName}`}>
      <div className={lineItemClassName}>
        {line.lineFullName}
        <div className={`line-item__thumb`} />
      </div>
    </Link>
  );
};

export default LineItem;
