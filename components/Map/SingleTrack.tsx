import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

type Direction = 'up' | 'down';

type TrackProps = {
  direction: Direction;
};

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

const Track = ({ direction }: TrackProps) => {
  return (
    <div className={`track track--${direction}`}>
      <Direction direction={direction} />
    </div>
  );
};

export default Track;
