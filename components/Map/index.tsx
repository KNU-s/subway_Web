import { Station } from '@/types/station';
import { useEffect, useState } from 'react';
import Section from './Section';

type MapProps = {
  stationList: Station[];
};

const Map = ({ stationList }: MapProps) => {
  const [isGroup, setIsGroup] = useState(false); // 지하철 역이 구간별로 나눠졌는지 여부
  const [groupStationList, setGroupStationList] = useState([stationList]);

  /** stationList 원소 객체에 groupId 속성이 있는지 확인한다. */
  useEffect(() => {
    if (stationList.length > 0 && 'groupId' in stationList[0]) setIsGroup(true);
  }, [stationList]);

  useEffect(() => {
    /** props로 받은 지하철 역에 그룹 속성이 존재할 때에만 그룹으로 묶는다. */
    if (isGroup) {
      const updateGroupStations = stationList.reduce<Record<number, Station[]>>(
        (acc, station) => {
          const { groupId } = station;
          if (groupId === undefined) {
            console.warn(`Station ${station.stationName} has no groupId.`);
            return acc; // groupId가 없는 역은 무시한다.
          }
          if (!acc[groupId]) acc[groupId] = [];
          acc[groupId].push(station);
          return acc;
        },
        {}, // {}를 초기값으로 사용한다
      );
      setGroupStationList(Object.values(updateGroupStations));
    }
  }, [isGroup, stationList]);

  return (
    <div className='map'>
      {groupStationList.map((stationList, index) => (
        <Section key={index} stationList={stationList} isGroup={isGroup} />
      ))}
    </div>
  );
};

export default Map;
