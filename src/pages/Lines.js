import { Link } from "react-router-dom";
import {
  useSetSelectLineId,
  useSetSelectLineName,
} from "../context/useSelectLineStore";
import { useLine } from "../hooks/useLine";

const Lines = () => {
  const { data: lineList } = useLine();
  const setSelectLineName = useSetSelectLineName();
  const setSelectLineId = useSetSelectLineId();

  const handleLinkClick = (line) => {
    // 해당 link 속성들 전역변수로 저장
    setSelectLineId(line.uniqueLineId);
    setSelectLineName(line.lineName);
  };

  return (
    <div className="subwayline">
      <h1 className="title">노선</h1>
      <div className="line_container">
        {lineList.map((line) => {
          return (
            <div key={line.uniqueLineId} className="line">
              <Link
                to={`/line/${line.uniqueLineId}`}
                // state={{ line: line }}
                className="line_title"
                onClick={() => handleLinkClick(line)}
              >
                {line.lineName}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lines;
