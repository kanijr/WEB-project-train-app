import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { trains } from "../../data/trains";
import "./Booking.css";
import WagonSelector from "../../components/WagonSelector/WagonSelector";

function Booking() {
  const { trainId } = useParams();

  const train = useMemo(
    () => trains.find((item) => item.id === Number(trainId)),
    [trainId],
  );

  const [selectedWagon, setSelectedWagon] = useState(
    train?.wagons?.[0] || null,
  );

  const handleSelectWagon = (wagon) => {
    setSelectedWagon(wagon);
  };

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
      <div className="booking__content">
        <WagonSelector
          wagons={train.wagons}
          selectedWagonId={selectedWagon?.id}
          onSelectWagon={handleSelectWagon}
        />
      </div>
    </main>
  );
}

export default Booking;
