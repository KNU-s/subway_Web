import { Link } from "react-router-dom";
import {
  useSetSelectLineId,
  useSetSelectLineName,
} from "../context/useSelectLineStore";
import { useLine } from "../hooks/useLine";

const Content = () => {
  const { data: lineList } = useLine();
  const setSelectLineName = useSetSelectLineName();
  const setSelectLineId = useSetSelectLineId();

  const handleLinkClick = (line) => {
    // 해당 link 속성들 전역변수로 저장
    setSelectLineId(line.uniqueLineId);
    setSelectLineName(line.lineName);
  };
  return (
    <div className="lines__content">
      {lineList.map((line) => {
        return (
          <div key={line.uniqueLineId}>
            <Link
              to={`/line/${line.uniqueLineId}`}
              className="line__title"
              onClick={() => handleLinkClick(line)}
            >
              {line.lineName}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

const Header = () => {
  return (
    <div className="lines__header">
      <h1 className="lines__title">노선</h1>
    </div>
  );
};

const Lines = () => {
  return (
    <div className="lines">
      <Header />
      <Content />
    </div>
  );
};

export default Lines;
