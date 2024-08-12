import { useState } from "react";
import { TrainInfoModal } from "../TrainInfoModal";
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
    "일반-내선": TrainIconRegularUp,
    "일반-외선": TrainIconRegularDown,
    "ITX-상행": TrainIconRegularUp,
    "ITX-하행": TrainIconRegularDown,
    "특급-상행": TrainIconRegularUp,
    "특급-하행": TrainIconRegularDown,
  };

  const key = `${btrainSttus}-${updnLine}`;
  const IconComponent = trainIcons[key];

  return (
    <div className="train-info__icon">
      <IconComponent />
    </div>
  );
};

const DestinationBox = ({ updnLine, destination }) => {
  const positionClass =
    updnLine === "상행" || updnLine === "내선"
      ? "destination-box--right"
      : "destination-box--left";

  return (
    <div className={`destination-box ${positionClass}`}>
      <div className="destination-box__item">{destination}</div>
    </div>
  );
};

const TrainInfo = ({ info }) => {
  const [showModal, setShowModal] = useState(false);

  const handleTrainClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="train-info" onClick={handleTrainClick}>
      {showModal && <TrainInfoModal closeModal={closeModal} info={info} />}
      <TrainIcon btrainSttus={info.btrainSttus} updnLine={info.updnLine} />
      <DestinationBox updnLine={info.updnLine} destination={info.bstatnNm} />
    </div>
  );
};

export default TrainInfo;
