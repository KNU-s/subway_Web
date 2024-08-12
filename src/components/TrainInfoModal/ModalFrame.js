// Modal에 들어갈 내용을 띄우고, Modal 열고 닫기 기능을 수행한다

import { IoCloseOutline } from "react-icons/io5";
import ModalPortal from "./ModalPortal";

const ModalCloseButton = ({ closeModal }) => {
  return (
    <div onClick={closeModal} className="modal__close-button">
      <IoCloseOutline />
    </div>
  );
};

const ModalBackground = ({ children, closeModal }) => {
  return (
    <div className="modal__background" onClick={closeModal}>
      {children}
    </div>
  );
};

const ModalBox = ({ children }) => {
  return (
    <div className="modal__box" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

const ModalFrame = ({ children, closeModal }) => {
  return (
    <ModalPortal>
      <ModalBackground closeModal={closeModal}>
        <ModalBox>
          {children}
          <ModalCloseButton closeModal={closeModal} />
        </ModalBox>
      </ModalBackground>
    </ModalPortal>
  );
};

export default ModalFrame;
