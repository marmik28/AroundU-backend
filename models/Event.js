const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: Number,
  image: String,
  title: String,
  date: String,
  time: String,
  attendees: Number,
  price: String,
  host: String,
  location: String,
  detail: String,
});

module.exports = mongoose.model('Event', eventSchema, 'events');
