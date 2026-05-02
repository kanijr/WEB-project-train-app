import "./TrainCard.css";

function TrainCard({ train }) {
  return (
    <div className="train-card">
      <h2 className="train-card__number">{train.number}</h2>
      <p className="train-card__route">
        {train.from} → {train.to}
      </p>
      <p className="train-card__date">Відправлення: {train.departureTime}</p>
    </div>
  );
}

export default TrainCard;
