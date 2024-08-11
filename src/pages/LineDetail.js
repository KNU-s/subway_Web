import { useEffect, useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { SectionList } from "../components/SectionList";
import {
  useSelectLineName,
  useSetSelectLineId,
  useSetSelectLineName,
} from "../context/useSelectLineStore";
import { useLineById } from "../hooks/useLineById";
import useWebSocket from "../hooks/useWebSocket";

const Header = ({ selectLineName }) => {
  return (
    <div className="header">
      <Link to={`/line`} className="header__back-button">
        <GoChevronLeft />
      </Link>
      <h1 className="header__title">{selectLineName}</h1>
    </div>
  );
};

/** 현재 url의 lineId 값을 글로벌 변수 selectLineId로 저장 */
const LineDetail = () => {
  const { lineId } = useParams();
  const setSelectLineId = useSetSelectLineId(); // 현재 url을 통해 lineId를 글로벌하게 저장
  const { data: currentLine } = useLineById(); // 글로벌 변수로 저장 후 해당하는 노선 정보 얻기 위함
  const [stationList, setStationList] = useState([]); // curentLine의 stations 속성 값

  const setSelectLineName = useSetSelectLineName(); // curentLine의 lineName 속성 값
  const selectLineName = useSelectLineName(); // 타이틀 및 웹소켓 인자로 사용하기 위함

  const [messages, loading, socketConnected] = useWebSocket(selectLineName); // lineName이 유효할 때만 useWebSocket을 호출한다
  const [latestMessage, setLatestMessage] = useState([]); // 소켓 마지막 메시지
  const [trainInfo, setTrainInfo] = useState({}); // 각 역에 매칭되는 모든 열차 배열들

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
   * 마지막 소켓 메시지(latestMessage)를 사용하여 trainInfo 객체 업데이트
   */
  useEffect(() => {
    if (
      Array.isArray(latestMessage) &&
      latestMessage.length > 0 &&
      Array.isArray(stationList) &&
      stationList.length > 0
    ) {
      const updatedTrainInfo = {};

      stationList.forEach((station) => {
        updatedTrainInfo[station.stationName] = {
          상행: [],
          하행: [],
        };
      });

      latestMessage.forEach((train) => {
        let { statnNm, updnLine } = train;

        /** 2호선 내선, 외선 에외 처리 */
        if (updnLine === "내선") updnLine = "상행";
        else if (updnLine === "외선") updnLine = "하행";

        // statnNm 또는 updnLine에 매칭되는 역이 없는 열차의 예외 상황 처리
        try {
          updatedTrainInfo?.[statnNm][updnLine].push({ ...train });
        } catch (error) {
          console.log("[Error]", error);
          console.log("[Error 발생한 Train]", train);
        }
      });

      setTrainInfo(updatedTrainInfo);
    }
  }, [latestMessage, stationList]);

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
    <div className="line-detail">
      <Header selectLineName={selectLineName} />
      {/* <h1 className="line-detail__title">{selectLineName}</h1> */}
      {!socketConnected || loading ? (
        "정보를 불러오는 중입니다. 잠시만 기다려 주세요."
      ) : (
        <SectionList stationList={stationList} trainInfo={trainInfo} />
      )}
    </div>
  );
};

export default LineDetail;
