const mongoose = require('mongoose');
const Flight = require('../models/Flight');

// Use environment variables to get database details
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME || 'flightclub';

const mongoURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;


// פונקציה לחיבור למסד הנתונים
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
    await populateDB();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};



// Function to populate the database with initial data
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

module.exports = connectDB;
