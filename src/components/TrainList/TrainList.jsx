import TrainCard from "../TrainCard/TrainCard";
import "./TrainList.css";

function TrainList({ trains }) {
  if (trains.length === 0) {
    return (
      <div className="train-list__empty">
        <h2>Рейсів не знайдено</h2>
        <p>Спробуйте змінити номер потяга або назву міста у пошуку.</p>
      </div>
    );
  }
  return (
    <section className="train-list">
      {trains.map((train) => (
        <TrainCard key={train.id} train={train} />
      ))}
    </section>
  );
}

export default TrainList;
