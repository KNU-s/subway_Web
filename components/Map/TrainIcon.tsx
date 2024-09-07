// import TrainIcons from '../TrainIcons';

import TrainIconExpressDown from '/public/images/train-icon-express-down.svg';
import TrainIconExpressUp from '/public/images/train-icon-express-up.svg';
import TrainIconRegularDown from '/public/images/train-icon-regular-down.svg';
import TrainIconRegularUp from '/public/images/train-icon-regular-up.svg';

type TrainIconProps = {
  direction: string;
  status: string;
};

const TrainIcon = ({ direction, status }: TrainIconProps) => {
  const trainIcons: Record<string, React.ComponentType> = {
    '급행-상행': TrainIconExpressUp,
    '급행-하행': TrainIconExpressDown,
    '일반-상행': TrainIconRegularUp,
    '일반-하행': TrainIconRegularDown,
    '일반-외선': TrainIconRegularUp,
    '일반-내선': TrainIconRegularDown,
    'ITX-상행': TrainIconRegularUp,
    'ITX-하행': TrainIconRegularDown,
    '특급-상행': TrainIconRegularUp,
    '특급-하행': TrainIconRegularDown,
  };

  const key = `${status}-${direction}`;
  const IconComponent = trainIcons[key];

  return (
    <div className='train-icon'>
      <IconComponent />
    </div>
  );
};

export default TrainIcon;
