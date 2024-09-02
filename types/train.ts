export interface Train {
  arvlMsg: string;
  arvlStatus: string;
  bstatnNm: string;
  btrainNo: string;
  btrainSttus: string;
  statnFNm: string;
  statnNm: string;
  statnTNm: string;
  updnLine: string;
}

export interface TrainAtStation {
  [direction: string]: Train[];
  상행: Train[];
  하행: Train[];
}

export interface TrainInfo {
  [stationName: string]: TrainAtStation;
}
