import { Station } from '@/types/station';

export interface Line {
  lineUrlId: number; // url 매칭을 위한 노선 고유 번호
  lineId: number; // 노선 ID
  lineFullName: string; // 종점을 포함한 노선 이름
  lineName?: string; // 노선 이름
  stations: Station[]; // 노선에 포함된 모든 역들
}
