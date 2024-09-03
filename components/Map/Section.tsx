import type { Station } from '@/types/station';
import { useEffect, useState } from 'react';
import StationItem from './StationItem';

type SectionProps = {
  stationList: Station[];
  isGroup: boolean;
};

type SectionTitleProps = {
  sectionName: string;
};

const SectionTitle = ({ sectionName }: SectionTitleProps) => {
  return <div className='section__title'>{sectionName}</div>;
};

const Section = ({ stationList, isGroup }: SectionProps) => {
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
      {stationList.map((station) => (
        <StationItem key={station.stationName} stationName={station.stationName} />
      ))}
    </div>
  );
};

export default Section;
