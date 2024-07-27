import { Link } from "react-router-dom";
// import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="title">실시간 지하철</h1>
      <Link to={`/line`} className="link">
        전체 노선 보기
      </Link>
    </div>
  );
};

export default HomePage;
