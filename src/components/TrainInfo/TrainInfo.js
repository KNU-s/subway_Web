import TrainIcons from "./TrainIcons";

const {
  TrainIconExpressDown,
  TrainIconExpressUp,
  TrainIconRegularDown,
  TrainIconRegularUp,
} = TrainIcons;

/* 열차의 종류(급행/일반)와 방향(상행/하행)에 따라 아이콘을 렌더링한다. */
const TrainIcon = ({ btrainSttus, updnLine }) => {
  const trainIcons = {
    "급행-상행": TrainIconExpressUp,
    "급행-하행": TrainIconExpressDown,
    "일반-상행": TrainIconRegularUp,
    "일반-하행": TrainIconRegularDown,
    "ITX-상행": TrainIconRegularUp,
    "ITX-하행": TrainIconRegularDown,
    "특급-상행": TrainIconRegularUp,
    "특급-하행": TrainIconRegularDown,
  };

  const key = `${btrainSttus}-${updnLine}`;
  const IconComponent = trainIcons[key];

  return <IconComponent />;
};

const TrainInfoTextBox = ({
  updnLine,
  bstatnNm,
  btrainNo,
  arvlMsg,
  arvlStatus,
}) => {
  const positionClass =
    updnLine === "상행" || updnLine === "내선"
      ? "text-box--right"
      : "text-box--left";

  return (
    <div className={`text-box ${positionClass}`}>
      <div className="text-box__item">{bstatnNm}</div>
      <div className="text-box__item">{btrainNo}</div>
      <div className="text-box__item">{arvlStatus}</div>
      <div className="text-box__item">{arvlMsg}</div>
    </div>
  );
};

const TrainInfo = ({ info }) => {
  return (
    <div className="train-info">
      <div className="train-info__icon">
        <TrainIcon btrainSttus={info.btrainSttus} updnLine={info.updnLine} />
        <TrainInfoTextBox {...info} />
      </div>
    </div>
  );
};

export default TrainInfo;
