
// config/db.js
const mongoose = require('mongoose');
const Flight = require('../models/Flight');

async function populateDB() {
  const initialFlights = [
    {
      airline: 'Airline A',
      flightNumber: 'A100',
      departureCity: 'New York',
      destinationCity: 'London',
      departureDate: new Date('2024-12-01'),
      returnDate: new Date('2024-12-15'),
      price: 500,
      passengers: 200,
    },
    {
      airline: 'Airline B',
      flightNumber: 'B200',
      departureCity: 'Los Angeles',
      destinationCity: 'Tokyo',
      departureDate: new Date('2024-11-25'),
      returnDate: new Date('2024-12-10'),
      price: 750,
      passengers: 180,
    },
    // Add more flight objects as needed
  ];

  try {
    const count = await Flight.countDocuments();
    if (count === 0) {
      await Flight.insertMany(initialFlights);
      console.log('Database populated with initial flights.');
    } else {
      console.log('Database already contains flight data.');
    }
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

const connectDB = async () => {
  mongoose.connect('mongodb://localhost:27017/flightclub')
  .then(() => {
    console.log('MongoDB connected');
    populateDB();
  })
  .catch((err) => {
    console.error(err);
  });
};

module.exports = connectDB;
