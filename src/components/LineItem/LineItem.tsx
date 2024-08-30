import { Link } from "react-router-dom";
import {
  useSetSelectLineId,
  useSetSelectLineName,
} from "../../context/useSelectLineStore";
import { Line } from "../../types/line";

interface LineItemProps {
  line: Line;
}

const LineItem = ({ line }: LineItemProps) => {
  const setSelectLineName = useSetSelectLineName();
  const setSelectLineId = useSetSelectLineId();

  /* 해당 link 속성들 전역변수로 저장 */
  const handleLinkClick = (line: Line) => {
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

export default LineItem;
