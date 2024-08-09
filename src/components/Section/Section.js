import { useEffect, useState } from "react";
import { Station } from "../Station";

const SectionTitle = ({ sectionName }) => {
  return <div>{sectionName}</div>;
};

/**
 * Section은 station들의 배열을 입력으로 받는다.
 * stationList에서 groupId와 groupName에 따라 구분한 뒤
 * orderId 순서에 따라 역들을 배치한다.
 */
const Section = ({ stationList, trainInfo }) => {
  const [sectionName, setSectionName] = useState(null);
  const [isGroup, setIsGroup] = useState(false);

  /** 그룹인지 아닌지 확인한다 */
  useEffect(() => {
    if (stationList.length > 0 && "groupId" in stationList[0]) {
      setIsGroup(true);
      setSectionName(stationList[0].groupName);
    }
  }, [stationList]);

  return (
    <div className="main_body_container">
      {isGroup && <SectionTitle sectionName={sectionName} />}
      {stationList.map((station) => {
        const { stationName } = station;
        const filteredTrainInfo = trainInfo[stationName];
        /** info 값이 없을 때 예외 처리 */
        const defaultInfoObject = {
          상행: [],
          하행: [],
        };
        return (
          <Station
            key={stationName}
            stationName={stationName}
            trainInfo={filteredTrainInfo || defaultInfoObject}
          />
        );
      })}
    </div>
  );
};

export default Section;
