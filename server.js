const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/events', async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Get an event by ID
app.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ id: parseInt(req.params.id) });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/events/location/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const events = await Event.find({ location: new RegExp(`^${location}$`, 'i') });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

