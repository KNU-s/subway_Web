import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="main">
      <h1 className="main__title">Live Subway</h1>
      <div className="main__sub-title">실시간 지하철 위치를 확인해보세요.</div>
      <Link to={`/line`} className="main__all-lines-button">
        전체 노선 보기
      </Link>
    </div>
  );
};

export default Main;
