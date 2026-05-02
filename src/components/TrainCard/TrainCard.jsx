import "./TrainCard.css";

function TrainCard({ train }) {
  return (
    <article className="train-card">
      <div className="train-card__header">
        <h2 className="train-card__number">{train.number}</h2>
        <span className="train-card__type">{train.trainType}</span>
      </div>

      <div className="train-card__route">
        <div className="train-card__city">
          <span className="train-card__city-name">{train.from}</span>
          <span className="train-card__time">{train.departureTime}</span>
        </div>

        <span className="train-card__arrow">→</span>

        <div className="train-card__city train-card__city--right">
          <span className="train-card__city-name">{train.to}</span>
          <span className="train-card__date">{train.departureDate}</span>
        </div>
      </div>

      <div className="train-card__details">
        <p className="train-card__detail">
          <span>Тривалість:</span> {train.duration}
        </p>

        <p className="train-card__detail">
          <span>Вартість від:</span> {train.price} грн
        </p>
      </div>
    </article>
  );
}

export default TrainCard;
