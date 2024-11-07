// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db'); // Import the database connection
const flightRoutes = require('./routes/flightRoutes'); // Import the routes (example)

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON
app.use(cors({ origin: 'http://localhost:4200' })); // Allow requests from your Angular app

// Connect to the Database
connectDB();

// Routes
app.use('/api/flights', flightRoutes); // Use flight routes for `/api/flights` endpoint

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
