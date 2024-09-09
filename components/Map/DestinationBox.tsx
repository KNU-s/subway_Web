type DestinationBoxProps = {
  direction: string;
  destination: string;
};

const DestinationBox = ({ direction, destination }: DestinationBoxProps) => {
  const positionClass = direction === '상행' ? 'destination-box--right' : 'destination-box--left';

  return (
    <div className={`destination-box ${positionClass}`}>
      <div className='destination-box__item'>{destination}</div>
    </div>
  );
};

export default DestinationBox;
