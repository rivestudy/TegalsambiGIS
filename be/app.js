const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});