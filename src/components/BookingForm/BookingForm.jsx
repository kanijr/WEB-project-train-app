import { useState } from "react";
import "./BookingForm.css";

const initialFormData = {
  fullName: "",
  phone: "",
  email: "",
};

function BookingForm({ selectedSeats, totalPrice, onSubmit }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const validationErrors = {};

    if (formData.fullName.trim().length < 3) {
      validationErrors.fullName = "Введіть ім’я довжиною не менше 3 символів";
    }

    if (!/^\+?\d{10,13}$/.test(formData.phone.trim())) {
      validationErrors.phone =
        "Телефон має містити від 10 до 13 цифр, можна з + на початку";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      validationErrors.email = "Введіть коректний email";
    }

    if (selectedSeats.length === 0) {
      validationErrors.seats = "Оберіть хоча б одне місце";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
    setFormData(initialFormData);
    setErrors({});
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
          {errors.fullName && (
            <small className="booking-form__error">{errors.fullName}</small>
          )}
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
          {errors.phone && (
            <small className="booking-form__error">{errors.phone}</small>
          )}
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
          {errors.email && (
            <small className="booking-form__error">{errors.email}</small>
          )}
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
          {errors.seats && (
            <small className="booking-form__error">{errors.seats}</small>
          )}
        </div>

        <button className="booking-form__button" type="submit">
          Забронювати квиток
        </button>
      </form>
    </section>
  );
}

export default BookingForm;
