import SingleTrack from "./SingleTrack";

const StationTitle = ({ stationName }) => {
  return <div className="station__title">{stationName}</div>;
};

const Station = ({ stationName, trainInfo }) => {
  return (
    <div className="station">
      <SingleTrack direction="down" trainInfo={trainInfo["하행"]} />
      <StationTitle stationName={stationName} />
      <SingleTrack direction="up" trainInfo={trainInfo["상행"]} />
    </div>
  );
};

export default Station;
