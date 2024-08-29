import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  selectLineName: string;
}

const Header = ({ selectLineName }: HeaderProps) => {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="header">
      <div className="header__back-button" onClick={handleBackButtonClick}>
        <GoChevronLeft />
      </div>
      <h1 className="header__title">{selectLineName}</h1>
    </div>
  );
};

export default Header;
