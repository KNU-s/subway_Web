import { Train } from '@/types/train';
import Track from './Track';

type StationTitleProps = {
  stationName: string;
};

const StationTitle = ({ stationName }: StationTitleProps) => {
  return <div className='station__title'>{stationName}</div>;
};

type StationItemProps = {
  stationName: string;
  upTrains: Train[];
  downTrains: Train[];
};

const StationItem = ({ stationName, upTrains, downTrains }: StationItemProps) => {
  return (
    <div className='station'>
      <Track direction='down' trains={downTrains} />
      <StationTitle stationName={stationName} />
      <Track direction='up' trains={upTrains} />
    </div>
  );
};

export default StationItem;
