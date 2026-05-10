const BOOKINGS_STORAGE_KEY = "railway-bookings";

function readBookings() {
  const savedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);

  if (!savedBookings) {
    return [];
  }

  try {
    return JSON.parse(savedBookings);
  } catch {
    return [];
  }
}

function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
}

export function getBookings() {
  return readBookings();
}

export function getBookedSeats(trainId, wagonId) {
  const bookings = readBookings();

  return bookings
    .filter(
      (booking) =>
        Number(booking.trainId) === Number(trainId) &&
        Number(booking.wagonId) === Number(wagonId),
    )
    .flatMap((booking) => booking.seats);
}

export function createBooking(bookingData) {
  const bookings = readBookings();

  const newBooking = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...bookingData,
  };

  saveBookings([...bookings, newBooking]);

  return newBooking;
}
