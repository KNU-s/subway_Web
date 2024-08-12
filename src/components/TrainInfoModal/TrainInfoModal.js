import ModalFrame from "./ModalFrame";

const ModalContent = ({ info }) => {
  return (
    <div className="modal-content">
      <div>열차 #{info.btrainNo}</div>
      <div>{info.arvlStatus}</div>
      <div>{info.arvlMsg}</div>
      <div>현재: {info.statnNm}</div>
      <div>종점: {info.bstatnNm}</div>
    </div>
  );
};

const TrainInfoModal = ({ closeModal, info }) => {
  return (
    <ModalFrame closeModal={closeModal}>
      <ModalContent info={info} />
    </ModalFrame>
  );
};

export default TrainInfoModal;
