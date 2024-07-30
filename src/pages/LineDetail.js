import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Station from "../components/Station";
import useWebSocket from "../hooks/useWebSocket";

const LineDetail = () => {
  const { state } = useLocation();
  const [lineName, setLineName] = useState("");
  const [stations, setStations] = useState([]);
  const [trainInfoByStation, setTrainInfoByStation] = useState({});

  const [messages, loading, socketConnected] = useWebSocket(lineName);

  /** 가장 최신 열차 정보를 사용하여 열차 위치 표시하기 */
  useEffect(() => {
    console.log("trainInfoByStation", trainInfoByStation);
  }, [trainInfoByStation]);

  /**
   * 서버에서 5초마다 실시간 열차 정보가 오면 처리
   * 기존 trainInfoByStation의 정보를 가장 최신 정보로 업데이트한다
   */
  useEffect(() => {
    console.log("messages", messages);

    if (messages.length) {
      const updatedTrainInfo = {};
      stations.forEach((station) => {
        updatedTrainInfo[station.stationName] = {};
      });

      const message = messages[messages.length - 1]; // 가장 마지막 정보만 화면에 띄운다
      message.forEach((train) => {
        const { statnNm, updnLine } = train;
        // console.log(train);
        if (!updatedTrainInfo.hasOwnProperty(statnNm)) {
          updatedTrainInfo[statnNm] = {};
        }
        if (!updatedTrainInfo.hasOwnProperty(updnLine)) {
          updatedTrainInfo[statnNm][updnLine] = [];
        }
        updatedTrainInfo[statnNm][updnLine].push(train);
      });

      setTrainInfoByStation(updatedTrainInfo);
    }
  }, [messages, stations]);

  // 이 페이지의 노선 이름과 모든 지하철역 설정
  useEffect(() => {
    if (state?.line) {
      setLineName(state.line.lineName);
      setStations(state.line.stations);

      // trainInfoByStation 초기화
      const initialTrainInfo = {};
      state.line.stations.forEach((station) => {
        initialTrainInfo[station.stationName] = {};
      });
      setTrainInfoByStation(initialTrainInfo);
    }
  }, [state]);

  return (
    <div className="subwaylinedetail">
      <h1>{lineName}</h1>
      <div>
        {socketConnected ? "[연결됨]" : "[연결끊김]"}
        {socketConnected &&
          (loading ? "로딩 중..." : `받은 총 메시지 ${messages.length}개`)}
      </div>
      <div className="main_body_container">
        {stations.map((station, index) => {
          const { stationName } = station;
          return (
            <Station
              key={index}
              stationName={stationName}
              trainInfo={trainInfoByStation[stationName]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LineDetail;
