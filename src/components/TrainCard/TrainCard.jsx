import "./TrainCard.css";

function TrainCard({ train }) {
  return (
    <article className="train-card">
      <div className="train-card__header">
        <div>
          <p className="train-card__label">Потяг</p>
          <h2 className="train-card__number">{train.number}</h2>
        </div>

        <span className="train-card__type">{train.trainType}</span>
      </div>

      <div className="train-card__route">
        <div className="train-card__city">
          <span className="train-card__city-name">{train.from}</span>
          <span className="train-card__time">{train.departureTime}</span>
        </div>

        <div className="train-card__line">
          <span></span>
        </div>

        <div className="train-card__city train-card__city--right">
          <span className="train-card__city-name">{train.to}</span>
          <span className="train-card__date">{train.departureDate}</span>
        </div>
      </div>

      <div className="train-card__details">
        <div>
          <p className="train-card__detail-label">Тривалість</p>
          <p className="train-card__detail-value">{train.duration}</p>
        </div>

        <div>
          <p className="train-card__detail-label">Вартість від</p>
          <p className="train-card__detail-value">{train.price} грн</p>
        </div>
      </div>
    </article>
  );
}

export default TrainCard;
