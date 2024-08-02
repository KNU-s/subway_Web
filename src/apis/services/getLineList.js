/**
 * 주어진 raw 데이터를 가공하여 노선에 따른 역 정보를 반환한다.
 * @param {Array} rawData 원시 데이터 배열
 * @returns {Array} 가공된 노선 정보 배열
 */
const getLineList = (rawData) => {
  const lines = {};
  let uniqueLineId = 1; // rawData에서 받은 값에서 받은 lineId가 중복되는 경우가 발생해서 자체적으로 unique값을 생성했다.
  rawData.forEach((station) => {
    const {
      stationId,
      stationName,
      stationLine: lineName,
      stationLineId: lineId,
    } = station;

    // 자히철 노선 정보 추가하기
    if (!lines[lineName]) {
      lines[lineName] = {
        lineName,
        lineId,
        uniqueLineId,
        stations: [],
      };
      uniqueLineId++;
    }

    // 노선에 따른 역 정보 추가하기
    lines[lineName].stations.push({
      stationId,
      stationName,
    });
  });

  // 가공된 노선 정보를 배열로 반환
  return Object.values(lines);
};

export default getLineList;
