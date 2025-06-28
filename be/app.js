const express = require('express');
const cors = require('cors'); // ✅ import cors
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

// Health check 
app.get('/', (req, res) => {
  res.send('API is running');
});

module.exports = app;
