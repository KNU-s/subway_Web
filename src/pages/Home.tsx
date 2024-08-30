import { LineItem } from "../components/LineItem";
import { useLine } from "../hooks/useLine";

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

const Home = () => {
  return (
    <div className="lines">
      <Header />
      <Content />
    </div>
  );
};

export default Home;
