import Tracks from "../Tracks";

const Station = ({ stationName, trainInfo }) => {
  return (
    <div className="station_container">
      <Tracks trainInfo={trainInfo} />
      <div className="station_name">{stationName}</div>
    </div>
  );
};

export default Station;
