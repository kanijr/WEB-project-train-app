import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { trains } from "../../data/trains";
import "./Booking.css";

function Booking() {
  const { trainId } = useParams();

  const train = useMemo(
    () => trains.find((item) => item.id === Number(trainId)),
    [trainId],
  );

  if (!train) {
    return (
      <main className="booking booking--center">
        <h1>Рейс не знайдено</h1>
        <Link className="booking__back-link" to="/">
          Повернутися до списку рейсів
        </Link>
      </main>
    );
  }

  return (
    <main className="booking">
      <Link className="booking__back-link" to="/">
        ← Повернутися до рейсів
      </Link>

      <section className="booking__hero">
        <div>
          <p className="booking__subtitle">Бронювання квитків</p>
          <h1 className="booking__title">
            Потяг {train.number}: {train.from} → {train.to}
          </h1>
          <p className="booking__description">
            Відправлення: {train.departureDate} о {train.departureTime}. Тип
            потяга: {train.trainType}.
          </p>
        </div>

        <div className="booking__price">
          <span>Ціна за місце</span>
          <strong>{train.price} грн</strong>
        </div>
      </section>
    </main>
  );
}

export default Booking;
