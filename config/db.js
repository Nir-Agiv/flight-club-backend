// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect('mongodb://localhost:27017/flightclub')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error(err);
  });
};

module.exports = connectDB;
