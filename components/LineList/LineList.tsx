import { LineItem } from '@/components/LineItem';
import { Line } from '@/types/line';

type LineListProps = {
  lineInfo: Line[];
};

const LineList = ({ lineInfo }: LineListProps) => {
  return (
    <div className='home__line-list'>
      {lineInfo.map((line) => (
        <LineItem key={line.lineUrlId} line={line} />
      ))}
    </div>
  );
};

export default LineList;
