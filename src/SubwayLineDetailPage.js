import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import styles from "./SubwayLineDetailPage.module.css";
import useWebSocket from "./useWebSocket";

/** 트랙 한 줄 */
const TrackOneLine = ({ direction }) => {
  return (
    <div className={styles.track_line}>
      <div className={styles.track_station_circle}>
        {direction === "down" ? (
          <MdOutlineKeyboardArrowDown className={styles.track_direction_icon} />
        ) : (
          <MdOutlineKeyboardArrowUp className={styles.track_direction_icon} />
        )}
      </div>
    </div>
  );
};

/** 트랙 두 줄 */
const TrackTwoLine = () => {
  return (
    <div className={styles.track_two_line_container}>
      <TrackOneLine direction="down" />
      <TrackOneLine direction="up" />
    </div>
  );
};

const Station = ({ stationName, updnInfo }) => {
  return (
    <div className={styles.station_container}>
      <TrackTwoLine />
      <div className={styles.station_name}>{stationName}</div>
      {/* <span>
        {Object.entries(updnInfo).map(([key, value]) => (
          <span key={key}>
            ({key}: {value.length})
          </span>
        ))}
      </span> */}
    </div>
  );
};

const SubwayLineDetailPage = () => {
  const { state } = useLocation();
  const [lineName, setLineName] = useState("");
  const [stations, setStations] = useState([]);
  const [trainInfoByStation, setTrainInfoByStation] = useState({});

  const [messages, loading, socketConnected] = useWebSocket(lineName);

  useEffect(() => {
    console.log("trainInfoByStation", trainInfoByStation);
  }, [trainInfoByStation]);

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

  // 서버에서 5초마다 실시간 열차 정보가 오면 처리
  // 기존 trainInfoByStation의 정보를 업데이트한다
  useEffect(() => {
    console.log("messages", messages);
    /**
     * [{
          "id":"66a0b115d46f1d27f597a2bb",
          "btrainNo":"0471",
          "statnNm":"직산",
          "statnFNm":"성환",
          "statnTNm":"두정",
          "bstatnNm":"서동탄",
          "arvlMsg":"[10]번째 전역 (병점)",
          "arvlStatus":"도착",
          "updnLine":"하행",
          "subwayLine":"1호선",
          "direction":null,
          "btrainSttus":"일반"
          },
     */
    if (messages.length) {
      const updatedTrainInfo = {};
      stations.forEach((station) => {
        updatedTrainInfo[station.stationName] = {};
      });

      const message = messages[messages.length - 1]; // 가장 마지막 정보만 화면에 띄운다
      message.forEach((train) => {
        const { statnId, updnLine } = train;
        // console.log(train);
        if (!updatedTrainInfo.hasOwnProperty(statnId)) {
          updatedTrainInfo[statnId] = {};
        }
        if (!updatedTrainInfo.hasOwnProperty(updnLine)) {
          updatedTrainInfo[statnId][updnLine] = [];
        }
        updatedTrainInfo[statnId][updnLine].push(train);
      });

      setTrainInfoByStation(updatedTrainInfo);
    }
  }, [messages, stations]);

  return (
    <div className={styles.container}>
      <h1>{lineName}</h1>
      <div>
        {socketConnected ? "[연결됨]" : "[연결끊김]"}
        {socketConnected &&
          (loading ? "로딩 중..." : `받은 총 메시지 ${messages.length}개`)}
      </div>
      <div className={styles.main_body_container}>
        {stations.map((station, index) => {
          const { stationName } = station;
          const updnInfo = trainInfoByStation[stationName];
          return (
            <Station
              key={index}
              stationName={stationName}
              updnInfo={updnInfo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SubwayLineDetailPage;
