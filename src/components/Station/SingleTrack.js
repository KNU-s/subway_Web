import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { TrainInfo } from "../TrainInfo";

const SingleTrack = ({ direction, trainInfo = [] }) => {
  return (
    <div className="track">
      <div className="direction__wrapper">
        {direction === "down" ? (
          <MdOutlineKeyboardArrowDown className="direction__icon" />
        ) : (
          <MdOutlineKeyboardArrowUp className="direction__icon" />
        )}
      </div>
      {trainInfo.map((info, index) => (
        <TrainInfo info={info} key={index} />
      ))}
    </div>
  );
};

export default SingleTrack;
