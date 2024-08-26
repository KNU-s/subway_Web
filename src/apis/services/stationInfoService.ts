import LINE_GYEONGUI_DATA from "../../data/lineGyeonguiData";
import getData from "../api/getData";

interface Station {
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

type StationList = Station[];

interface Line {
  uniqueLineId: number; // url 매칭을 위한 노선 고유 번호
  lineId: number;
  lineName: string;
  stations: StationList;
}

type LineList = Line[];

/**
 * API GET 요청을 보낸 후 받은 모든 역 정보 데이터를 반환한다.
 * @returns 모든 역 정보를 담은 배열
 */
export const getStationList = async (): Promise<StationList> => {
  try {
    const response = await getData<StationList>(`api/v1/station-info`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Station Data");
  }
};

/**
 * getStationList 메소드에서 받아온 데이터를 가공하는 함수이다.
 * 모든 역을 노선에 따라 분류한다.
 * @returns 노선에 따라 분류된 모든 역
 */
export const getLineList = async (): Promise<LineList> => {
  try {
    const stationList = await getStationList();
    const lineMap = new Map<string, Line>();
    let uniqueLineId = 1; // rawData에서 lineId가 중복되는 경우가 발생해서 자체적으로 unique값을 생성했다.
    stationList.sort((a, b) => a.order - b.order); // order 값 기준 오름차순 정렬
    stationList.forEach((station) => {
      const lineName = station.stationLine;
      const lineId = station.stationLineId;

      if (lineName !== undefined && lineId !== undefined) {
        // 노선이 맵에 없으면 새로 생성
        if (!lineMap.has(lineName)) {
          lineMap.set(lineName, {
            uniqueLineId,
            lineId,
            lineName,
            stations: [],
          });
          uniqueLineId++;
        }

        const line = lineMap.get(lineName);
        if (line) {
          line.stations.push(station);
        }
      }
    });

    // 경의중앙선의 경우, stations 값에 상수데이터를 추가한다
    const gyeonguiLine = lineMap.get("경의중앙선");
    if (gyeonguiLine) {
      gyeonguiLine.stations = LINE_GYEONGUI_DATA; // 경의중앙선의 경우, LINE_GYEONGUI_DATA를 사용
    }

    return Array.from(lineMap.values()); // Map을 배열로 변환하여 return 한다
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Station Data");
  }
};
