import TrainCard from "../TrainCard/TrainCard";
import "./TrainList.css";

function TrainList({ trains }) {
  return (
    <section className="train-list">
      {trains.map((train) => (
        <TrainCard key={train.id} train={train} />
      ))}
    </section>
  );
}

export default TrainList;
