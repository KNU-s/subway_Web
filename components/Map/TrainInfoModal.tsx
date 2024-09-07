import { Train } from '@/types/train';
import React, { ReactNode } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

type BackgroundProps = {
  children: ReactNode;
  closeModal: (e: React.MouseEvent) => void;
};

type BoxProps = {
  children: ReactNode;
};

type CloseButtonProps = {
  closeModal: (e: React.MouseEvent) => void;
};

type ModalFrameProps = {
  children: ReactNode;
  closeModal: (e: React.MouseEvent) => void;
};

type ModalContentProps = {
  trainInfo: Train;
};

type TrainInfoModalProps = {
  closeModal: (e: React.MouseEvent) => void;
  trainInfo: Train;
};

const CloseButton = ({ closeModal }: CloseButtonProps) => {
  return (
    <div className='train-info-modal__close-button' onClick={closeModal}>
      <IoCloseOutline />
    </div>
  );
};

const ModalContent = ({ trainInfo }: ModalContentProps) => {
  return (
    <div className='train-info-modal__content'>
      <div>열차 #{trainInfo.btrainNo}</div>
      <div>{trainInfo.arvlMsg}</div>
      <div>{trainInfo.arvlStatus}</div>
      <div>이전: {trainInfo.statnFNm}</div>
      <div>현재: {trainInfo.statnNm}</div>
      <div>다음: {trainInfo.statnTNm}</div>
      <div>종점: {trainInfo.bstatnNm}</div>
    </div>
  );
};

const Background = ({ children, closeModal }: BackgroundProps) => {
  return (
    <div className='train-info-modal__background' onClick={closeModal}>
      {children}
    </div>
  );
};

const Box = ({ children }: BoxProps) => {
  const handleBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div className='train-info-modal__box' onClick={handleBoxClick}>
      {children}
    </div>
  );
};

const ModalFrame = ({ children, closeModal }: ModalFrameProps) => {
  return (
    <Background closeModal={closeModal}>
      <Box>
        <CloseButton closeModal={closeModal} />
        {children}
      </Box>
    </Background>
  );
};

const TrainInfoModal = ({ closeModal, trainInfo }: TrainInfoModalProps) => {
  return (
    <ModalFrame closeModal={closeModal}>
      <ModalContent trainInfo={trainInfo} />
    </ModalFrame>
  );
};

export default TrainInfoModal;
