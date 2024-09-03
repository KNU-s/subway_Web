import Track from './SingleTrack';

type StationItemProps = {
  stationName: string;
};
type StationTitleProps = {
  stationName: string;
};

const StationTitle = ({ stationName }: StationTitleProps) => {
  return <div className='station__title'>{stationName}</div>;
};

const StationItem = ({ stationName }: StationItemProps) => {
  return (
    <div className='station'>
      <Track direction='down' />
      <StationTitle stationName={stationName} />
      <Track direction='up' />
    </div>
  );
};

export default StationItem;
