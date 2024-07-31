import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLineFetch, useLineList } from "../context/useLineStore";

const Lines = () => {
  const lineList = useLineList();
  const { fetchLineList } = useLineFetch();

  useEffect(() => {
    fetchLineList();
  }, [fetchLineList]);

  useEffect(() => {
    console.log("lineList", lineList);
  }, [lineList]);

  return (
    <div className="subwayline">
      <h1 className="title">노선</h1>
      <div className="line_container">
        {lineList.map((line, index) => (
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
