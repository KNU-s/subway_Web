import SingleTrack from "./SingleTrack";

const Tracks = ({ trainInfo }) => {
  return (
    <div className="track_two_line_container">
      <SingleTrack
        direction="down"
        trainInfo={trainInfo["하행"]} // 이 부분 수정해야 함
      />
      <SingleTrack
        direction="up"
        trainInfo={trainInfo["상행"]} // 이 부분 수정해야 함
      />
    </div>
  );
};

export default Tracks;
