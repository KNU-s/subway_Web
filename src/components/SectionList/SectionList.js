import { useEffect, useState } from "react";
import { Section } from "../Section";

const SectionList = ({ stationList, trainInfo }) => {
  const [isGroup, setIsGroup] = useState(false); // 지하철 역이 구간별로 나눠졌는지 여부
  const [groupStationList, setGroupStationList] = useState([stationList]);

  /** stationList 원소 객체에 groupId 속성이 있는지 확인한다. */
  useEffect(() => {
    if ("groupId" in stationList[0]) setIsGroup(true);
  }, [stationList]);

  /**
   * stationList 원소 객체에 groupId 속성이 있을 때만
   * groupId를 기준으로 stationList를 그룹화한다.
   */
  useEffect(() => {
    if (isGroup) {
      const updateGroupStations = stationList.reduce((acc, station) => {
        const { groupId } = station;
        if (!acc[groupId]) acc[groupId] = [];
        acc[groupId].push(station);
        return acc;
      }, {});
      setGroupStationList(Object.values(updateGroupStations));
    }
  }, [isGroup, stationList]);

  return (
    <div className="section-list">
      {groupStationList.map((stationList, index) => (
        <Section key={index} stationList={stationList} trainInfo={trainInfo} />
      ))}
    </div>
  );
};

export default SectionList;
