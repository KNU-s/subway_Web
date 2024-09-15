import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
  const [isHidden, setIsHidden] = useState(false);
  let lastScrollY = 0;
  const headerClassName = isHidden ? `header header--hidden` : `header`;

  const router = useRouter();
  const title = typeof router.query.lineName === 'string' ? router.query.lineName : '노선';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 5 && currentScrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={headerClassName}>
      <BackButton />
      <h1 className='header__title'>{title}</h1>
    </div>
  );
};

export default Header;
