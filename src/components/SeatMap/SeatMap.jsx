import "./SeatMap.css";

function SeatMap({ seatsCount, bookedSeats, selectedSeats, onToggleSeat }) {
  const seats = Array.from({ length: seatsCount }, (_, index) => index + 1);

  const getSeatClassName = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return "seat-map__seat seat-map__seat--booked";
    }

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

        <div className="seat-map__legend">
          <span>
            <i className="seat-map__legend-mark seat-map__legend-mark--free" />
            Вільне
          </span>
          <span>
            <i className="seat-map__legend-mark seat-map__legend-mark--selected" />
            Обране
          </span>
          <span>
            <i className="seat-map__legend-mark seat-map__legend-mark--booked" />
            Заброньоване
          </span>
        </div>
      </div>

      <div className="seat-map__wagon">
        <div className="seat-map__door">Вхід</div>

        <div className="seat-map__grid">
          {seats.map((seatNumber) => {
            const isBooked = bookedSeats.includes(seatNumber);

            return (
              <button
                key={seatNumber}
                className={getSeatClassName(seatNumber)}
                type="button"
                disabled={isBooked}
                onClick={() => onToggleSeat(seatNumber)}
              >
                {seatNumber}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SeatMap;
