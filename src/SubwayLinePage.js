import { Link } from "react-router-dom";

const SubwayLinePage = () => {
  const LINE_INFO = [1, 2, 3, 4, 5];
  return (
    <div>
      This is LinePage.
      <div>
        {LINE_INFO.map((line) => (
          <div key={line}>
            <Link to={`/line/${line}`}>{line}호선</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubwayLinePage;
