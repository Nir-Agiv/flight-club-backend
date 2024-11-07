// models/Flight.js
const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  flightNumber: {
    type: String,
    required: true,
    unique: true,
  },
  departure: {
    airport: { type: String, required: true },
    time: { type: Date, required: true },
  },
  arrival: {
    airport: { type: String, required: true },
    time: { type: Date, required: true },
  },
  price: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Flight', FlightSchema);
