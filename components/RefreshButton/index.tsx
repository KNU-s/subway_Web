import useLineId from '@/hooks/useLineId';
import { SendMessage } from '@/types/webSocket';
import { useState } from 'react';
import { RxReload } from 'react-icons/rx';

type RefreshButtonProps = {
  sendMessage: SendMessage;
};

const RefreshButton = ({ sendMessage }: RefreshButtonProps) => {
  const [isDisabled, setIsDisabled] = useState(false); // 버튼 비활성화
  const [isRotating, setIsRotating] = useState(false); // 버튼 회전
  const lineId = useLineId();
  const containerClassName = `refresh-button__container refresh-button__container--line-${lineId} ${isDisabled ? 'disabled' : ''}`;
  const iconClassName = `refresh-button__icon ${isRotating ? 'rotating' : ''}`;

  const handleClick = () => {
    // 버튼이 비활성화 상태라면 클릭 무시
    if (isDisabled) return;

    // 버튼 클릭 시 메시지 전송, 버튼 회전 애니메이션과 비활성화 처리
    sendMessage();
    setIsDisabled(true);
    setIsRotating(true);

    // 3초 후에 버튼 다시 활성화, 회전 애니메이션 종료
    setTimeout(() => {
      setIsDisabled(false);
      setIsRotating(false);
    }, 3000);
  };

  return (
    <div className={containerClassName} onClick={handleClick}>
      <div className={iconClassName}>
        <RxReload />
      </div>
    </div>
  );
};

export default RefreshButton;
