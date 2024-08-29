import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { SectionList } from "../components/SectionList";
import {
  useSelectLineName,
  useSetSelectLineId,
  useSetSelectLineName,
} from "../context/useSelectLineStore";
import { useLineById } from "../hooks/useLineById";
import useWebSocket from "../hooks/useWebSocket";
import { Station } from "../types/station";
import { TrainInfoItem } from "../types/trainInfo";

interface TrainInfoAtStation {
  [direction: string]: TrainInfoItem[];
  상행: TrainInfoItem[];
  하행: TrainInfoItem[];
}

interface TrainInfo {
  [stationName: string]: TrainInfoAtStation;
}

type Direction = "상행" | "하행";

/** 현재 url의 lineId 값을 글로벌 변수 selectLineId로 저장 */
const LineDetail = () => {
  const { lineId } = useParams();
  const setSelectLineId = useSetSelectLineId(); // 현재 url을 통해 lineId를 글로벌하게 저장
  const { data: currentLine } = useLineById(); // 글로벌 변수로 저장 후 해당하는 노선 정보 얻기 위함
  const [stationList, setStationList] = useState<Station[]>([]); // curentLine의 stations 속성 값

  const setSelectLineName = useSetSelectLineName(); // curentLine의 lineName 속성 값
  const selectLineName = useSelectLineName(); // 타이틀 및 웹소켓 인자로 사용하기 위함

  const [message, loading] = useWebSocket(selectLineName); // lineName이 유효할 때만 useWebSocket을 호출한다
  const [trainInfo, setTrainInfo] = useState<TrainInfo>({}); // 각 역에 매칭되는 모든 열차 배열들

  /** currentLine 변수가 업데이트되면 속성 stations를 통해 역 정보 얻는다 */
  useEffect(() => {
    if (currentLine) {
      setStationList(currentLine.stations);
    }
  }, [currentLine]);

  /* 소켓 메시지로 trainInfo 객체 업데이트 */
  useEffect(() => {
    if (stationList.length > 0) {
      const updatedTrainInfo: TrainInfo = {};
      const stationSet = new Set(
        stationList.map((station) => station.stationName)
      );

      /* 모든 station을 순회하며 trainInfo 객체 구조를 초기화한다 */
      stationList.forEach((station) => {
        updatedTrainInfo[station.stationName] = {
          상행: [],
          하행: [],
        };
      });

      /* 소켓 메시지를 순회하며 각 열차 정보를 trainInfo 객체에 매칭한다 */
      message.forEach((train) => {
        const { statnNm, bstatnNm, updnLine: originalUpdnLine } = train;
        const updnLine: Direction =
          originalUpdnLine === "외선" || originalUpdnLine === "상행"
            ? "상행"
            : originalUpdnLine === "내선" || originalUpdnLine === "하행"
            ? "하행"
            : "상행";

        /* 현재역과 종점이 stationList에 속하지 않는 경우 해당 열차를 제외하고 다음 열차로 넘어감 */
        if (!stationSet.has(statnNm) || !stationSet.has(bstatnNm)) return;

        // updatedTrainInfo에 현재 trainInfo를 추가한다
        try {
          updatedTrainInfo[statnNm][updnLine].push(train);
        } catch (error) {
          console.error(error);
          console.log("train", train);
        }
      });

      setTrainInfo(updatedTrainInfo);
    }
  }, [message, stationList]);

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
      {loading ? (
        "정보를 불러오는 중입니다. 잠시만 기다려 주세요."
      ) : (
        <SectionList stationList={stationList} trainInfo={trainInfo} />
      )}
    </div>
  );
};

export default LineDetail;
