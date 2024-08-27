export interface Station {
  order: number; // 역 배치 순서 (오름차순 정렬)
  stationId: string; // 숫자로만 이루어진 역 고유 ID
  stationName: string; // 역 이름

  /* 선택 사항 */
  stationLine?: string; // 노선 이름
  id?: string; // 알파벳과 숫자로 이루어진 역 고유 ID
  stationLineId?: number;

  /* 그룹(section)이 있는 경의중앙선에만 해당 */
  groupId?: number;
  groupName?: string;
}

export type StationList = Station[];
