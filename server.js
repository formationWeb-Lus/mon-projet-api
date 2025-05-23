require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/entity');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI is missing. Please set it in your environment variables.');
  process.exit(1); // Stop the app
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(express.json());
app.use('/api/entities', routes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
