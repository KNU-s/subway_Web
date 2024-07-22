import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SubwayLineDetailPage.module.css";
import useWebSocket from "./useWebSocket";

const SubwayLineDetailPage = () => {
  const { state } = useLocation();
  const [lineName, setLineName] = useState("");
  const [stations, setStations] = useState([]);
  const [trains, setTrains] = useState([]);

  const [messages, loading, socketConnected] = useWebSocket(lineName);

  useEffect(() => {
    if (state?.line) {
      setLineName(state.line.lineName);
      setStations(state.line.stations);
    }
  }, [state]);

  useEffect(() => {
    if (messages.length) {
      setTrains(messages);
    }
  }, [messages]);

  useEffect(() => {
    // 서버에서 5초마다 실시간 열차 정보가 오면 처리
    console.log("trains", trains);
  }, [trains]);

  return (
    <div className={styles.container}>
      <h1>{lineName}</h1>
      <div>
        {socketConnected ? "[연결됨]" : "[연결끊김]"}
        {socketConnected &&
          (loading ? "로딩 중..." : `메세지 ${trains.length}개`)}
      </div>
      <div className={styles.track}>
        {stations.map((station) => (
          <div>{station.stationName}</div>
        ))}
      </div>
    </div>
  );
};

export default SubwayLineDetailPage;
