import "./SeatMap.css";

function SeatMap({ seatsCount, selectedSeats, onToggleSeat }) {
  const seats = Array.from({ length: seatsCount }, (_, index) => index + 1);

  const getSeatClassName = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      return "seat-map__seat seat-map__seat--selected";
    }

    return "seat-map__seat seat-map__seat--free";
  };

  return (
    <section className="seat-map">
      <div className="seat-map__header">
        <div>
          <h2 className="seat-map__title">Схема місць</h2>
          <p className="seat-map__description">
            Натисніть на вільне місце, щоб обрати або скасувати вибір.
          </p>
        </div>
      </div>

      <div className="seat-map__wagon">
        <div className="seat-map__door">Вхід</div>

        <div className="seat-map__grid">
          {seats.map((seatNumber) => (
            <button
              key={seatNumber}
              className={getSeatClassName(seatNumber)}
              type="button"
              onClick={() => onToggleSeat(seatNumber)}
            >
              {seatNumber}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SeatMap;
