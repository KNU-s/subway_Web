import { Train } from '@/types/train';
import React, { ReactNode } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
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
      <div className='train-number'>#{trainInfo.btrainNo}</div>
      <div className='arrival-message'>{trainInfo.arvlMsg}</div>
      <div className='station-info'>
        <div className='station-info__current-station'>{trainInfo.statnNm}</div>
        <div className='station-info__direction-icon'>
          <HiArrowLongRight />
        </div>
        <div className='station-info__final-station'>{trainInfo.bstatnNm}</div>
      </div>
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
