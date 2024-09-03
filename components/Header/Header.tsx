import { useRouter } from 'next/router';
import { GoChevronLeft } from 'react-icons/go';

type HeaderProps = {
  title: string;
  showBackButton?: boolean; // 뒤로가기 버튼 표시할지 여부
};

const BackButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <div className='header__back-button' onClick={handleClick}>
      <GoChevronLeft />
    </div>
  );
};

const Header = ({ title, showBackButton = false }: HeaderProps) => {
  return (
    <div className='header'>
      {showBackButton && <BackButton />}
      <h1 className='header__title'>{title}</h1>
    </div>
  );
};

export default Header;
