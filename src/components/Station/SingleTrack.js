import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { TrainInfo } from "../TrainInfo";

const DirectionIcon = ({ direction }) => {
  const directionIcons = {
    상행: MdOutlineKeyboardArrowUp,
    하행: MdOutlineKeyboardArrowDown,
  };

  const IconComponent = directionIcons[direction];

  return (
    <div className="direction__wrapper">
      <IconComponent className="direction__icon" />
    </div>
  );
};

const SingleTrack = ({ direction, trainInfo = [] }) => {
  const trackDirectionClassName =
    direction === "상행" || direction === "내선" ? "track--up" : "track--down";
  return (
    <div className={`track ${trackDirectionClassName}`}>
      <DirectionIcon direction={direction} />
      {trainInfo.map((info, index) => (
        <TrainInfo info={info} key={index} />
      ))}
    </div>
  );
};

export default SingleTrack;
