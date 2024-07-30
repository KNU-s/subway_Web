import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getStation from "../apis/api/getStation";
import getStationList from "../apis/services/getStationList";

const Lines = () => {
  const [lineInfo, setLineInfo] = useState([]);

  useEffect(() => {
    (async () => {
      await getStation()
        .then(getStationList)
        .then((stationList) => setLineInfo(stationList))
        .catch((error) => console.log(error));
    })();
  }, []);

  return (
    <div className="subwayline">
      <h1 className="title">노선</h1>
      <div className="line_container">
        {lineInfo.map((line, index) => (
          <div key={index} className="line">
            <Link
              to={`/line/${index}`}
              state={{ line: line }}
              className="line_title"
            >
              {line.lineName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lines;
