import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import { ReactComponent as TrainIconExpressDown } from "./assets/images/train-icon-express-down.svg";
import { ReactComponent as TrainIconExpressUp } from "./assets/images/train-icon-express-up.svg";
import { ReactComponent as TrainIconRegularDown } from "./assets/images/train-icon-regular-down.svg";
import { ReactComponent as TrainIconRegularUp } from "./assets/images/train-icon-regular-up.svg";
import styles from "./SubwayLineDetailPage.module.css";
import useWebSocket from "./useWebSocket";

/** train 정보를 바탕으로 해당 열차의 정보를 보여주고 위치를 결정한다 */
const TrainInfo = ({ info }) => {
  /** train 정보 바탕으로 아이콘 선택하기 */
  const getTrainIcon = (trainStatus, updnLine) => {
    if (trainStatus === "일반") {
      if (updnLine === "상행" || updnLine === "내선") {
        return <TrainIconRegularUp />;
      } else if (updnLine === "하행" || updnLine === "외선") {
        return <TrainIconRegularDown />;
      }
    } else if (trainStatus === "급행") {
      if (updnLine === "상행" || updnLine === "내선") {
        return <TrainIconExpressUp />;
      } else if (updnLine === "하행" || updnLine === "외선") {
        return <TrainIconExpressDown />;
      }
    }
  };

  // const classNameTrainInfoBox = (updnLine==="상행" ||updnLine==="하행")?styles.train;

  const bstatnNm = info.bstatnNm; // 종착지하철역명
  const btrainNo = info.btrainNo; // 열차번호(현재운행하고 있는 호선별 열차번호)
  const arvlMsg = info.arvlMsg; // arvlMsg2, 첫번째도착메세지 (도착, 출발 , 진입 등)
  const arvlStatus = info.arvlStatus; // arvlCd, 도착코드 (0:진입, 1:도착, 2:출발, 3:전역출발, 4:전역진입, 5:전역도착, 99:운행중)
  // arvlStatus에 따라 위치 다르게 표시하기
  return (
    <div className={styles.train_info_container}>
      <div className={styles.train_icon_container}>
        {getTrainIcon(info.btrainSttus, info.updnLine)}
        <div
          className={`${styles.train_info_box} ${
            info.updnLine === "상행" || info.updnLine === "내선"
              ? styles.train_info_box_right
              : styles.train_info_box_left
          }`}
        >
          <div className={styles.train_info_text}>{bstatnNm}</div>
          <div className={styles.train_info_text}>{btrainNo}</div>
          <div className={styles.train_info_text}>{arvlStatus}</div>
        </div>
      </div>
    </div>
  );
};

/** 트랙 한 줄 */
const TrackOneLine = ({ direction, trainInfo = [] }) => {
  return (
    <div className={styles.track_line}>
      <div className={styles.track_station_circle}>
        {direction === "down" ? (
          <MdOutlineKeyboardArrowDown className={styles.track_direction_icon} />
        ) : (
          <MdOutlineKeyboardArrowUp className={styles.track_direction_icon} />
        )}
      </div>
      {trainInfo.map((info) => (
        <TrainInfo info={info} />
      ))}
    </div>
  );
};

/** 트랙 두 줄 */
const TrackTwoLine = ({ trainInfo }) => {
  return (
    <div className={styles.track_two_line_container}>
      <TrackOneLine
        direction="down"
        trainInfo={trainInfo ? trainInfo["하행"] : {}} // 이 부분 수정해야 함
      />
      <TrackOneLine
        direction="up"
        trainInfo={trainInfo ? trainInfo["상행"] : {}} // 이 부분 수정해야 함
      />
    </div>
  );
};

const Station = ({ stationName, trainInfo }) => {
  return (
    <div className={styles.station_container}>
      <TrackTwoLine trainInfo={trainInfo} />
      <div className={styles.station_name}>{stationName}</div>
    </div>
  );
};

const SubwayLineDetailPage = () => {
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

export default SubwayLineDetailPage;
