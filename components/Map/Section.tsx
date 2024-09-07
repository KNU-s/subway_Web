import type { Station } from '@/types/station';
import { Train } from '@/types/train';
import { useEffect, useState } from 'react';
import StationItem from './StationItem';

type SectionTitleProps = {
  sectionName: string;
};

const SectionTitle = ({ sectionName }: SectionTitleProps) => {
  return <div className='section__title'>{sectionName}</div>;
};

type SectionProps = {
  stationList: Station[];
  trainInfo: Train[];
  isGroup: boolean;
};

const Section = ({ stationList, trainInfo, isGroup }: SectionProps) => {
  const [sectionName, setSectionName] = useState('');

  /** 그룹인 경우, section 이름을 결정한다. */
  useEffect(() => {
    if (isGroup && stationList.length > 0 && stationList[0].groupName !== undefined) {
      setSectionName(stationList[0].groupName);
    }
  });

  return (
    <div className='section'>
      {isGroup && <SectionTitle sectionName={sectionName} />}
      {stationList.map((station) => {
        // 해당 역에 위치한 상행/하행 열차를 필터링한다.
        const upTrainsAtStation = trainInfo.filter(
          (train) => train.statnNm === station.stationName && train.updnLine === '상행',
        );
        const downTrainsAtStation = trainInfo.filter(
          (train) => train.statnNm === station.stationName && train.updnLine === '하행',
        );
        return (
          <StationItem
            key={station.stationName}
            stationName={station.stationName}
            upTrains={upTrainsAtStation}
            downTrains={downTrainsAtStation}
          />
        );
      })}
    </div>
  );
};

export default Section;
