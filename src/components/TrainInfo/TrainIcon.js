import TrainIcons from "./TrainIcons";

const {
  TrainIconExpressDown,
  TrainIconExpressUp,
  TrainIconRegularDown,
  TrainIconRegularUp,
} = TrainIcons;

const TrainIcon = ({ info }) => {
  const trainIcons = {
    "급행-상행": TrainIconExpressUp,
    "급행-하행": TrainIconExpressDown,
    "일반-상행": TrainIconRegularUp,
    "일반-하행": TrainIconRegularDown,
    "일반-내선": TrainIconRegularUp,
    "일반-외선": TrainIconRegularDown,
    "ITX-상행": TrainIconRegularUp,
    "ITX-하행": TrainIconRegularDown,
    "특급-상행": TrainIconRegularUp,
    "특급-하행": TrainIconRegularDown,
  };

  const key = `${info.btrainSttus}-${info.updnLine}`;
  const IconComponent = trainIcons[key];

  return (
    <div className="train-icon">
      <IconComponent />
    </div>
  );
};

export default TrainIcon;
