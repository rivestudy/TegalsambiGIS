const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); // ✅ Import path module

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// ✅ Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('API is running');
});

module.exports = app;