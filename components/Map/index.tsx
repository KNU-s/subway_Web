import { Station } from '@/types/station';
import { Train } from '@/types/train';
import { useEffect, useState } from 'react';
import Section from './Section';

type MapProps = {
  stationList: Station[];
  trainInfo: Train[];
};

const Map = ({ stationList, trainInfo }: MapProps) => {
  const [isGroup, setIsGroup] = useState(false); // 지하철 역이 구간별로 나눠졌는지 여부
  const [groupStationList, setGroupStationList] = useState([stationList]);
  const [filteredTrainInfo, setFilteredTrainInfo] = useState([...trainInfo]);

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

  /** 열차의 종점이 역 이름과 매칭되지 않을 경우 해당 열차 제외한다. */
  useEffect(() => {
    const stationNames = new Set(stationList.map((station) => station.stationName)); // stationList의 역 이름들 집합
    const filteredTrains = trainInfo.filter((train) => stationNames.has(train.bstatnNm)); // 역 이름 집합에 종점이 없을 경우 제외한다
    setFilteredTrainInfo(filteredTrains);
  }, [stationList, trainInfo]);

  return (
    <div className='map'>
      {groupStationList.map((stationList, index) => (
        <Section
          key={index}
          stationList={stationList}
          trainInfo={filteredTrainInfo}
          isGroup={isGroup}
        />
      ))}
    </div>
  );
};

export default Map;
