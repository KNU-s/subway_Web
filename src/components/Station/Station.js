import SingleTrack from "./SingleTrack";

const StationTitle = ({ stationName }) => {
  return <div className="station__title">{stationName}</div>;
};

const Station = ({ stationName, trainInfo }) => {
  return (
    <div className="station">
      <SingleTrack direction="하행" trainInfo={trainInfo["하행"]} />
      <StationTitle stationName={stationName} />
      <SingleTrack direction="상행" trainInfo={trainInfo["상행"]} />
    </div>
  );
};

export default Station;
