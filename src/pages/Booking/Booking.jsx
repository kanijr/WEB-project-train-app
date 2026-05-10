import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { trains } from "../../data/trains";
import "./Booking.css";
import WagonSelector from "../../components/WagonSelector/WagonSelector";
import SeatMap from "../../components/SeatMap/SeatMap";
import BookingForm from "../../components/BookingForm/BookingForm";
import { createBooking, getBookedSeats } from "../../services/BookingService";

function Booking() {
  const { trainId } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);

  const train = useMemo(
    () => trains.find((item) => item.id === Number(trainId)),
    [trainId],
  );

  const [selectedWagon, setSelectedWagon] = useState(
    train?.wagons?.[0] || null,
  );
  const [selectedSeats, setSelectedSeats] = useState([]);

  const totalPrice = train ? train.price * selectedSeats.length : 0;

  useEffect(() => {
    if (!train || !selectedWagon) {
      return;
    }

    const savedBookedSeats = getBookedSeats(train.id, selectedWagon.id);
    setBookedSeats(savedBookedSeats);
  }, [train, selectedWagon]);

  const handleSelectWagon = (wagon) => {
    setSelectedWagon(wagon);
    setSelectedSeats([]);
  };

  const handleToggleSeat = (seatNumber) => {
    setSelectedSeats((currentSeats) => {
      if (currentSeats.includes(seatNumber)) {
        return currentSeats.filter((seat) => seat !== seatNumber);
      }

      return [...currentSeats, seatNumber].sort((a, b) => a - b);
    });
  };

  const handleSubmitBooking = (passengerData) => {
    const booking = createBooking({
      trainId: train.id,
      wagonId: selectedWagon.id,
      trainNumber: train.number,
      route: `${train.from} → ${train.to}`,
      seats: selectedSeats,
      totalPrice,
      passenger: passengerData,
    });

    setBookedSeats((currentSeats) => [
      ...new Set([...currentSeats, ...booking.seats]),
    ]);

    setSelectedSeats([]);

    setSuccessMessage(
      `Бронювання створено. Місця: ${booking.seats.join(", ")}.`,
    );
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

      {successMessage && (
        <div className="booking__success">{successMessage}</div>
      )}

      <div className="booking__layout">
        <div className="booking__main">
          <WagonSelector
            wagons={train.wagons}
            selectedWagonId={selectedWagon?.id}
            onSelectWagon={handleSelectWagon}
          />
          {selectedWagon && (
            <SeatMap
              seatsCount={selectedWagon.seatsCount}
              bookedSeats={bookedSeats}
              selectedSeats={selectedSeats}
              onToggleSeat={handleToggleSeat}
            />
          )}
        </div>

        <aside className="booking__aside">
          <BookingForm
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
            onSubmit={handleSubmitBooking}
          />
        </aside>
      </div>
    </main>
  );
}

export default Booking;
