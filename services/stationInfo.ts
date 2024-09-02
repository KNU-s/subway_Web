import GYEONGUI_LINE from '@/data/gyeonguiLine';
import { axiosInstance } from '@/services';
import { Line } from '@/types/line';
import { Station } from '@/types/station';

export const getStationInfo = () => axiosInstance.get('/station-info');

export const getLineInfo = async (): Promise<Line[]> => {
  try {
    const { data: stationInfo } = await getStationInfo();
    const lineMap = new Map<string, Line>();
    let lineUrlId = 1; // rawData에서 lineId가 중복되는 경우가 발생해서 자체적으로 unique값을 생성했다.
    stationInfo.sort((a: Station, b: Station) => a.order - b.order); // order 값 기준 오름차순 정렬
    stationInfo.forEach((station: Station) => {
      const lineFullName = station.stationLine;
      const lineId = station.stationLineId;
      if (lineFullName !== undefined && lineId !== undefined) {
        // 노선이 맵에 없으면 새로 생성
        if (!lineMap.has(lineFullName)) {
          lineMap.set(lineFullName, {
            lineUrlId,
            lineId,
            lineFullName,
            stations: [],
          });
          lineUrlId++;
        }
        const line = lineMap.get(lineFullName);
        if (line) {
          line.stations.push(station);
        }
      }
    });

    // 경의중앙선의 경우, stations 값에 상수데이터를 추가한다
    const gyeonguiLine = lineMap.get('경의중앙선');
    if (gyeonguiLine) {
      gyeonguiLine.stations = GYEONGUI_LINE; // 경의중앙선의 경우, LINE_GYEONGUI_DATA를 사용
    }

    return Array.from(lineMap.values()); // Map을 배열로 변환하여 return 한다
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get Line Data');
  }
};
