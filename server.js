require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger/swagger.json', 'utf8'));

const app = express();

const entityRoutes = require('./routes/entity');
const courseRoutes = require('./routes/courses');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI is missing. Please set it in your environment variables.');
  process.exit(1);
}

// Connexion MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware JSON
app.use(express.json());

// Routes API
app.use('/api/entities', entityRoutes);
app.use('/api/courses', courseRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serveur
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
