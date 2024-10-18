// backend/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mern-crud');
    console.log('MongoDB connected');
  } catch (err) {
    console.error("False");
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
