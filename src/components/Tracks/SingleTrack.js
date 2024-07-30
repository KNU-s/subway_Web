import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import TrainInfo from "../TrainInfo/TrainIcons";

const SingleTrack = ({ direction, trainInfo = [] }) => {
  return (
    <div className="track_line">
      <div className="track_station_circle">
        {direction === "down" ? (
          <MdOutlineKeyboardArrowDown className="track_direction_icon" />
        ) : (
          <MdOutlineKeyboardArrowUp className="track_direction_icon" />
        )}
      </div>
      {trainInfo.map((info) => (
        <TrainInfo info={info} />
      ))}
    </div>
  );
};

export default SingleTrack;
