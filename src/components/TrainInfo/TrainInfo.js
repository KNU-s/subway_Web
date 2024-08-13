import { useState } from "react";
import { TrainInfoModal } from "../TrainInfoModal";
import TrainIcon from "./TrainIcon";

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

  const getStatus = (info) => {
    let status;
    if (info.statnFNm === info.statnNm) {
      if (
        info.arvlMsg.includes("전역") ||
        info.arvlMsg.includes(info.statnNm)
      ) {
        // 이전역인 경우
        if (info.arvlMsg.includes("진입")) {
          status = "approach";
        } else if (info.arvlMsg.includes("출발")) {
          status = "depart";
        } else {
          status = "arrive";
        }
      } else {
        // 다음역인 경우
        if (info.arvlMsg.includes("진입")) {
          status = "next-approach";
        } else if (info.arvlMsg.includes("출발")) {
          status = "next-depart";
        } else {
          status = "next-arrive";
        }
      }
    } else {
      if (info.arvlMsg.includes(info.statnNm)) {
        if (info.arvlMsg.includes("진입")) {
          status = "approach";
        } else if (info.arvlMsg.includes("출발")) {
          status = "depart";
        } else {
          status = "arrive";
        }
      } else if (info.arvlStatus.includes(info.statnNm)) {
        if (info.arvlStatus.includes("진입")) {
          status = "approach";
        } else if (info.arvlStatus.includes("출발")) {
          status = "depart";
        } else {
          status = "arrive";
        }
      } else {
        if (info.arvlMsg.includes("진입")) {
          status = "approach";
        } else if (info.arvlMsg.includes("출발")) {
          status = "depart";
        } else {
          status = "arrive";
        }
      }
    }
    return status;
  };

  /* info에 따라 열차 위치 디테일하게 조정하기 위함 */
  const positionClass = {
    updn: info.updnLine === "상행" || info.updnLine === "내선" ? "up" : "down",
    status: getStatus(info),
  };

  return (
    <div
      className={`train-info train-info__${positionClass.updn}--${positionClass.status}`}
      onClick={handleTrainClick}
    >
      {showModal && <TrainInfoModal closeModal={closeModal} info={info} />}
      <TrainIcon info={info} />
      <DestinationBox updnLine={info.updnLine} destination={info.bstatnNm} />
    </div>
  );
};

export default TrainInfo;
