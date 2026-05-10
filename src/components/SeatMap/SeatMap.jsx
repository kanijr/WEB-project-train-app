import "./SeatMap.css";

function SeatMap({
  seatsCount,
  wagonType,
  bookedSeats,
  selectedSeats,
  onToggleSeat,
}) {
  const seats = Array.from({ length: seatsCount }, (_, index) => index + 1);
  const normalizedWagonType = wagonType.toLowerCase();

  const getSeatClassName = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return "seat-map__seat seat-map__seat--booked";
    }

    if (selectedSeats.includes(seatNumber)) {
      return "seat-map__seat seat-map__seat--selected";
    }

    return "seat-map__seat seat-map__seat--free";
  };

  const renderSeat = (seatNumber) => {
    if (!seatNumber) {
      return null;
    }

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
  };

  const renderAisle = (key) => {
    return <div key={key} className="seat-map__aisle" aria-hidden="true" />;
  };

  const renderRow = (items, rowKey, isGroupEnd = false) => {
    return (
      <div
        key={rowKey}
        className={
          isGroupEnd
            ? "seat-map__row seat-map__row--group-end"
            : "seat-map__row"
        }
      >
        {items.map((item, index) => {
          if (item === "aisle") {
            return renderAisle(`${rowKey}-aisle-${index}`);
          }

          return renderSeat(item);
        })}
      </div>
    );
  };

  const renderSittingLayout = () => {
    const rows = [];

    for (let index = 0; index < seats.length; index += 4) {
      const group = seats.slice(index, index + 4);

      rows.push(
        renderRow(
          [group[0], group[1], "aisle", group[2], group[3]],
          `sitting-${index}`,
        ),
      );
    }

    return rows;
  };

  const renderPlatzkartLayout = () => {
    const rows = [];

    for (let index = 0; index < seats.length; index += 6) {
      const group = seats.slice(index, index + 6);

      rows.push(
        renderRow(
          [group[0], group[1], "aisle", group[4]],
          `platzkart-${index}-top`,
        ),
      );

      rows.push(
        renderRow(
          [group[2], group[3], "aisle", group[5]],
          `platzkart-${index}-bottom`,
          true,
        ),
      );
    }

    return rows;
  };

  const renderCoupeLayout = () => {
    const rows = [];

    for (let index = 0; index < seats.length; index += 4) {
      const group = seats.slice(index, index + 4);

      rows.push(renderRow([group[0], group[1], "aisle"], `coupe-${index}-top`));

      rows.push(
        renderRow([group[2], group[3], "aisle"], `coupe-${index}-bottom`, true),
      );
    }

    return rows;
  };

  const renderSeatsLayout = () => {
    if (normalizedWagonType === "сидячий") {
      return renderSittingLayout();
    }

    if (normalizedWagonType.includes("плацкарт")) {
      return renderPlatzkartLayout();
    }

    return renderCoupeLayout();
  };

  return (
    <section className="seat-map">
      <div className="seat-map__header">
        <div>
          <h2 className="seat-map__title">Схема місць</h2>
          <p className="seat-map__description">
            Вагон: <strong>{wagonType}</strong>. Натисніть на вільне місце, щоб
            обрати або скасувати вибір.
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

        <div className="seat-map__layout">{renderSeatsLayout()}</div>
      </div>
    </section>
  );
}

export default SeatMap;
