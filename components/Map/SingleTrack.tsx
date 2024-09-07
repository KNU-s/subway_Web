import { Train } from '@/types/train';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import TrainMarker from './TrainMarker';

type Direction = 'up' | 'down';

type DirectionProps = {
  direction: Direction;
};

const Direction = ({ direction }: DirectionProps) => {
  const directionIcons = {
    up: MdOutlineKeyboardArrowUp,
    down: MdOutlineKeyboardArrowDown,
  };
  const IconComponent = directionIcons[direction];
  return (
    <div className='direction'>
      <IconComponent className='direction__icon' />
    </div>
  );
};

type TrackProps = {
  direction: Direction;
  trains: Train[];
};

const Track = ({ direction, trains }: TrackProps) => {
  return (
    <div className={`track track--${direction}`}>
      <Direction direction={direction} />
      {trains.map((train) => (
        <TrainMarker key={train.btrainNo} trainInfo={train} />
      ))}
    </div>
  );
};

export default Track;
