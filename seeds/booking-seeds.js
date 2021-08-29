const { Booking } = require("../models");

const bookingData = [
  {
    user_id: "1",
    trip_id: "1",
    price: "1525.02",
    payment_id: "PYMT001",
  },
  {
    user_id: "2",
    trip_id: "2",
    price: "2000.20",
    payment_id: "PYMT002",
  },
];

const seedBooking = () => Booking.bulkCreate(bookingData);

module.exports = seedBooking;
