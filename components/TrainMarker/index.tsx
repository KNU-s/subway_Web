import { Train } from '@/types/train';

type TrainMarkerProps = {
  trainInfo: Train[];
};

const TrainMarker = ({ trainInfo }: TrainMarkerProps) => {
  return <div className='train-marker'>This is TrainMarker</div>;
};

export default TrainMarker;
