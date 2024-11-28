const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../server'); // Import the app and server
const Flight = require('../models/Flight');

describe('Flight Routes', () => {
  beforeAll(async () => {
    // Set up your test MongoDB URI
    process.env.MONGO_URI = 'mongodb://localhost:27017/flightclub'; // Adjust as needed
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Close MongoDB and server after all tests
    await mongoose.connection.close();
    if (server) {
      server.close();
    }
  });

  it('should return all flights', async () => {
    // Add mock data or ensure your DB has data
    const flight = new Flight({
      airline: 'Airline A',
      flightNumber: 'A100',
      departureCity: 'New York',
      destinationCity: 'London',
      departureDate: new Date('2024-12-01'),
      returnDate: new Date('2024-12-15'),
      price: 500,
      passengers: 200,
    });
    await flight.save();

    const response = await request(app).get('/api/flights');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].airline).toBe('Airline A');
  });

  it('should return matching flights based on search criteria', async () => {
    // Mock flight data
    const flight = new Flight({
      airline: 'Airline A',
      flightNumber: 'A101',
      departureCity: 'New York',
      destinationCity: 'London',
      departureDate: new Date('2024-12-01'),
      returnDate: new Date('2024-12-15'),
      price: 500,
      passengers: 200,
    });
    await flight.save();

    const response = await request(app).post('/api/flights/search').send({
      departureCity: 'New York',
      destinationCity: 'London',
      departureDate: new Date('2024-12-01'),
      returnDate: new Date('2024-12-15'),
      passengers: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should create a new booking', async () => {
    const bookingData = {
      flightId: '12345', 
      customerName: 'John Doe',
      passengers: 2,
    };

    const response = await request(app).post('/api/flights/bookings').send(bookingData);
    expect(response.status).toBe(201);
    expect(response.body.customerName).toBe('John Doe');
  });

  it('should handle booking failures', async () => {
    const bookingData = {}; // Missing required fields

    const response = await request(app).post('/api/flights/bookings').send(bookingData);
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Booking failed');
  });
});
