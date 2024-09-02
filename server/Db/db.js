const mongoose = require('mongoose');
const {dbCredentials} = require('../config/index');

const db = async () => {
    try {
      await mongoose.connect(dbCredentials.uri);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); 
    }
  };

  db();
  
  module.exports = db;