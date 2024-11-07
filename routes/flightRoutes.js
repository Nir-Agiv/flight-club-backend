// routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// GET all flights
router.get('/', flightController.getAllFlights);

// GET a flight by ID
router.get('/:id', flightController.getFlightById);

// POST a new flight
router.post('/', flightController.createFlight);

// PUT to update a flight by ID
router.put('/:id', flightController.updateFlight);

// DELETE a flight by ID
router.delete('/:id', flightController.deleteFlight);

module.exports = router;
