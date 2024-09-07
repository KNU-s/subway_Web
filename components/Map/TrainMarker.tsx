import { Train } from '@/types/train';
import { useState } from 'react';
import DestinationBox from './DestinationBox';
import TrainIcon from './TrainIcon';
import TrainInfoModal from './TrainInfoModal';

type TrainMarkerProps = {
  trainInfo: Train;
};

const TrainMarker = ({ trainInfo }: TrainMarkerProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleTrainClick = () => {
    setShowModal(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(false);
  };

  const calculateStatus = (info: Train) => {
    let status;
    if (info.statnFNm === info.statnNm) {
      if (info.arvlMsg.includes('전역') || info.arvlMsg.includes(info.statnNm)) {
        // 이전역인 경우
        if (info.arvlMsg.includes('진입')) {
          status = 'approach';
        } else if (info.arvlMsg.includes('출발')) {
          status = 'depart';
        } else {
          status = 'arrive';
        }
      } else {
        // 다음역인 경우
        if (info.arvlMsg.includes('진입')) {
          status = 'next-approach';
        } else if (info.arvlMsg.includes('출발')) {
          status = 'next-depart';
        } else {
          status = 'next-arrive';
        }
      }
    } else {
      if (info.arvlMsg.includes(info.statnNm)) {
        if (info.arvlMsg.includes('진입')) {
          status = 'approach';
        } else if (info.arvlMsg.includes('출발')) {
          status = 'depart';
        } else {
          status = 'arrive';
        }
      } else if (info.arvlStatus.includes(info.statnNm)) {
        if (info.arvlStatus.includes('진입')) {
          status = 'approach';
        } else if (info.arvlStatus.includes('출발')) {
          status = 'depart';
        } else {
          status = 'arrive';
        }
      } else {
        if (info.arvlMsg.includes('진입')) {
          status = 'approach';
        } else if (info.arvlMsg.includes('출발')) {
          status = 'depart';
        } else {
          status = 'arrive';
        }
      }
    }
    return status;
  };

  /* info에 따라 열차 위치 디테일하게 조정하기 위함 */
  const positionClass = {
    updn: trainInfo.updnLine === '상행' ? 'up' : 'down',
    status: calculateStatus(trainInfo),
  };

  const iconPositionClassName = `train-marker__${positionClass.updn}--${positionClass.status}`;

  return (
    <div className={`train-marker ${iconPositionClassName}`} onClick={handleTrainClick}>
      {showModal && <TrainInfoModal closeModal={closeModal} trainInfo={trainInfo} />}
      <TrainIcon direction={trainInfo.updnLine} status={trainInfo.btrainSttus} />
      <DestinationBox direction={trainInfo.updnLine} destination={trainInfo.bstatnNm} />
    </div>
  );
};

export default TrainMarker;
