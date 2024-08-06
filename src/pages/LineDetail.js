import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Station from "../components/Station";
import {
  useSelectLineName,
  useSetSelectLineId,
  useSetSelectLineName,
} from "../context/useSelectLineStore";
import { useLineById } from "../hooks/useLineById";
import useWebSocket from "../hooks/useWebSocket";

const LineDetail = () => {
  const { lineId } = useParams();
  const setSelectLineId = useSetSelectLineId(); // 현재 url을 통해 lineId를 글로벌하게 저장
  const { data: currentLine } = useLineById(); // 글로벌 변수로 저장 후 해당하는 노선 정보 얻기 위함

  const setSelectLineName = useSetSelectLineName(); // selectLineName을 업데이트하기 위함
  const selectLineName = useSelectLineName(); // 웹소켓 인자로 사용하기 위함

  const [messages, loading, socketConnected] = useWebSocket(selectLineName); // lineName이 유효할 때만 useWebSocket을 호출한다

  const [latestMessage, setLatestMessage] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [trainInfo, setTrainInfo] = useState({});
  const [trainInfoTemplate, setTrainInfoTemplate] = useState({}); // trainInfo 객체의 기본 구성 (only changed by stationList)

  /** currentLine 변수가 업데이트되면 속성 stations를 통해 역 정보 얻는다 */
  useEffect(() => {
    if (currentLine) {
      setStationList(currentLine.stations);
    }
  }, [currentLine]);

  /** 마지막 소켓 메세지 업데이트 */
  useEffect(() => {
    if (messages.length > 0) {
      /** messages가 빈 배열일 경우 예외 처리 */
      setLatestMessage(messages[messages.length - 1]);
    }
  }, [messages]);

  /**
   * 마지막 소켓 메시지로 trainInfo 업데이트
   * 이때 trainInfoTemplate 사용한다.
   */
  useEffect(() => {
    const newTrainInfo = { ...trainInfoTemplate };
    latestMessage.forEach((train) => {
      newTrainInfo?.[train.statnNm]?.[train.updnLine]?.push({ ...train });
    });
    setTrainInfo(newTrainInfo);
  }, [latestMessage, trainInfoTemplate]);

  /**
   * stationList가 업데이트되면 trainInfoTemplate 객체 초기화
   * 각 지하철 역 이름을 key로 하는 객체 생성
   */
  useEffect(() => {
    const template = {};
    stationList.forEach((station) => {
      template[station.stationName] = {
        // 각 역 객체의 값으로 상행, 하행 2개의 속성을 가진다
        상행: [],
        하행: [],
      };
    });
    setTrainInfoTemplate(template);
  }, [stationList]);

  /**
   * 새로고침을 하면 useWebSocket이 실행되지 않는 문제를 해결하기 위해 추가한 코드
   * currentLine이 변경될 때마다 전역변수 selectLineName을 업데이트한다.
   * useWebSocket은 selectLineName에 의존하고 있기 때문에 새로고침하면 재실행된다.
   */
  useEffect(() => {
    if (currentLine) {
      setSelectLineName(currentLine.lineName);
    }
  }, [currentLine, setSelectLineName]);

  /** 현재 url의 param을 글로벌 변수 selectLineId로 저장한다 */
  useEffect(() => {
    setSelectLineId(lineId);
  }, [lineId, setSelectLineId]);

  return (
    <div className="subwaylinedetail">
      <h1>{selectLineName}</h1>
      <div>
        {socketConnected ? "[연결됨]" : "[연결끊김]"}
        {socketConnected &&
          (loading ? "로딩 중..." : `받은 총 메시지 ${messages.length}개`)}
      </div>
      <div className="main_body_container">
        {Object.entries(trainInfo).map(([stationName, info]) => {
          /** info 값이 없을 때 예외 처리 */
          const defaultInfoObject = {
            상행: [],
            하행: [],
          };
          return (
            <Station
              key={stationName}
              stationName={stationName}
              trainInfo={info || defaultInfoObject}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LineDetail;
