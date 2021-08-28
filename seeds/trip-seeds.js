const { Trip } = require("../models");

const tripData = [
  {
    from: "Bangalore",
    to: "Chennai",
    departure: "2021-11-26 12:42:30",
    return: "2022-02-21 12:42:30",
    user_id: 1,
  },
  {
    from: "Bangalore",
    to: "Chennai",
    departure: "2021-11-26 12:42:30",
    return: "2022-02-21 12:42:30",
    user_id: 2,
  },
];

const seedTrip = () => Trip.bulkCreate(tripData);

module.exports = seedTrip;
