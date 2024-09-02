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

/**
 * 각 노선별로 역들을 저장하기 위한 타입
 * 키가 노선 이름이고, 값이 해당 노선에 속한 역들의 배열
 */
// export type GroupedStations = {
//   [lineName: string]: Station[];
// };
