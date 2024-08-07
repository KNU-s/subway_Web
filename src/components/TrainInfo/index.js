import TrainIcons from "./TrainIcons";

const {
  TrainIconExpressDown,
  TrainIconExpressUp,
  TrainIconRegularDown,
  TrainIconRegularUp,
} = TrainIcons;

const TrainInfo = ({ info }) => {
  /** train 정보 바탕으로 아이콘 선택하기 */
  const getTrainIcon = (trainStatus, updnLine) => {
    if (trainStatus !== "급행") {
      // btrainSttus === "일반" || "ITX"
      if (updnLine === "상행" || updnLine === "내선") {
        return <TrainIconRegularUp />;
      } else if (updnLine === "하행" || updnLine === "외선") {
        return <TrainIconRegularDown />;
      }
    } else {
      if (updnLine === "상행" || updnLine === "내선") {
        return <TrainIconExpressUp />;
      } else if (updnLine === "하행" || updnLine === "외선") {
        return <TrainIconExpressDown />;
      }
    }
  };

  const bstatnNm = info.bstatnNm; // 종착지하철역명
  const btrainNo = info.btrainNo; // 열차번호(현재운행하고 있는 호선별 열차번호)
  const arvlMsg = info.arvlMsg; // arvlMsg2, 첫번째도착메세지 (도착, 출발 , 진입 등)
  const arvlStatus = info.arvlStatus; // arvlCd, 도착코드 (0:진입, 1:도착, 2:출발, 3:전역출발, 4:전역진입, 5:전역도착, 99:운행중)
  // arvlStatus에 따라 위치 다르게 표시하기
  return (
    <div className="train_info_container">
      <div className="train_icon_container">
        {getTrainIcon(info.btrainSttus, info.updnLine)}
        <div
          className={`train_info_box ${
            info.updnLine === "상행" || info.updnLine === "내선"
              ? "train_info_box_right"
              : "train_info_box_left"
          }`}
        >
          <div className="train_info_text">{bstatnNm}</div>
          <div className="train_info_text">{btrainNo}</div>
          <div className="train_info_text">{arvlStatus}</div>
          <div className="train_info_text">{arvlMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default TrainInfo;
