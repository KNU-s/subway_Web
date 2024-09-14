import { useRouter } from 'next/router';
import { GoChevronLeft } from 'react-icons/go';

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

const Header = () => {
  const router = useRouter();
  const title = typeof router.query.lineName === 'string' ? router.query.lineName : '노선';
  return (
    <div className='header'>
      <BackButton />
      <h1 className='header__title'>{title}</h1>
    </div>
  );
};

export default Header;
