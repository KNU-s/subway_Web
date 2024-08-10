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
    <div className="train-info">
      <div className="train-info__icon">
        {getTrainIcon(info.btrainSttus, info.updnLine)}
        <div
          className={`text-box ${
            info.updnLine === "상행" || info.updnLine === "내선"
              ? "text-box--right"
              : "text-box--left"
          }`}
        >
          <div className="text-box__item">{bstatnNm}</div>
          <div className="text-box__item">{btrainNo}</div>
          <div className="text-box__item">{arvlStatus}</div>
          <div className="text-box__item">{arvlMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default TrainInfo;
