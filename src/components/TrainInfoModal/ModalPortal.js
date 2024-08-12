import { createPortal } from "react-dom";

const ModalPortal = ({ children }) => {
  const modalRoot = document.getElementById("modal");
  return createPortal(children, modalRoot);
};

export default ModalPortal;
