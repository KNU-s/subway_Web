export interface TrainInfoItem {
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

interface TrainInfoAtStation {
  [direction: string]: TrainInfoItem[];
  상행: TrainInfoItem[];
  하행: TrainInfoItem[];
}

interface TrainInfo {
  [stationName: string]: TrainInfoAtStation;
}
