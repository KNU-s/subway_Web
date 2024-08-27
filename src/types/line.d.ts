export interface Line {
  uniqueLineId: number; // url 매칭을 위한 노선 고유 번호
  lineId: number;
  lineName: string;
  stations: StationList;
}

export type LineList = Line[];
