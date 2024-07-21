import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClickSubwayLineButton = () => {
    navigate(`/line`);
  };
  return (
    <div>
      This is HomePage.
      <button onClick={handleClickSubwayLineButton}>지하철 노선</button>
    </div>
  );
};

export default HomePage;
