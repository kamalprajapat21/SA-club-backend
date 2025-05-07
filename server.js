require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const memberRoutes = require('./routes/memberRoutes');
const culturalRoutes = require('./routes/culturalTrips');
const contactRoute = require('./routes/contact');

const app = express();

// ✅ CORS configuration to allow frontend origin
const corsOptions = {
  origin: 'https://sa-club-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight

app.use(express.json());

// Serve static images from /assets
app.use('/assets', express.static('assets'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/members', memberRoutes);
app.use('/api', culturalRoutes);
app.use('/api', contactRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
