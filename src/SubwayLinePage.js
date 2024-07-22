import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SubwayLinePage.module.css";

const SubwayLinePage = () => {
  const [lineInfo, setLineInfo] = useState([]); // 각 노선의 name, id, stations

  const getStationInfo = async () => {
    try {
      const { data } = await axios.get(`/api/v1/station-info`); // url 주소 시작에 슬래쉬 주의
      // const data = result.data;
      const lines = {};

      data.forEach((station) => {
        const { stationId, stationName, stationLine, stationLineId } = station;

        // 자히철 노선 정보 추가하기
        if (!lines[stationLineId]) {
          lines[stationLineId] = {
            lineName: stationLine,
            lineId: stationLineId,
            stations: [],
          };
        }

        // 노선에 따른 역 정보 추가하기
        lines[stationLineId].stations.push({
          stationId,
          stationName,
        });
      });

      setLineInfo(Object.values(lines));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStationInfo();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>노선</h1>
      <div className={styles.line_container}>
        {lineInfo.map((line) => (
          <div key={line.lineId} className={styles.line}>
            <Link
              to={`/line/${line.lineId}`}
              state={{ line: line }}
              className={styles.line_title}
            >
              {line.lineName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubwayLinePage;
