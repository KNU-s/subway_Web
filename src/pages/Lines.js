import { Link } from "react-router-dom";
import {
  useSetSelectLineId,
  useSetSelectLineName,
} from "../context/useSelectLineStore";
import { useLine } from "../hooks/useLine";

const LineItem = ({ line }) => {
  const setSelectLineName = useSetSelectLineName();
  const setSelectLineId = useSetSelectLineId();

  /* 해당 link 속성들 전역변수로 저장 */
  const handleLinkClick = (line) => {
    setSelectLineId(line.uniqueLineId);
    setSelectLineName(line.lineName);
  };

  const lineIdClass = `${line.lineId}`;

  return (
    <Link
      to={`/line/${line.uniqueLineId}`}
      className={`line-item line-item__${lineIdClass}`}
      onClick={() => handleLinkClick(line)}
    >
      {line.lineName}
      <div className={`line-item__thumb`} />
    </Link>
  );
};

const Content = () => {
  const { data: lineList } = useLine();

  return (
    <div className="lines__list">
      {lineList.map((line) => (
        <LineItem key={line.uniqueLineId} line={line} />
      ))}
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
