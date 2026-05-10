import { useState } from "react";
import "./BookingForm.css";

const initialFormData = {
  fullName: "",
  phone: "",
  email: "",
};

function BookingForm({ selectedSeats, totalPrice, onSubmit }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
    setFormData(initialFormData);
  };

  return (
    <section className="booking-form">
      <h2 className="booking-form__title">Дані пасажира</h2>

      <form className="booking-form__content" onSubmit={handleSubmit}>
        <label className="booking-form__field">
          <span>Ім’я</span>
          <input
            type="text"
            name="fullName"
            placeholder="Наприклад: Іван Петренко"
            value={formData.fullName}
            onChange={handleChange}
          />
        </label>

        <label className="booking-form__field">
          <span>Телефон</span>
          <input
            type="tel"
            name="phone"
            placeholder="+380671234567"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label className="booking-form__field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="passenger@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <div className="booking-form__summary">
          <p>
            Обрані місця:{" "}
            <strong>
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : "немає"}
            </strong>
          </p>
          <p>
            До сплати: <strong>{totalPrice} грн</strong>
          </p>
        </div>

        <button className="booking-form__button" type="submit">
          Забронювати квиток
        </button>
      </form>
    </section>
  );
}

export default BookingForm;
