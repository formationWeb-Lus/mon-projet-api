// Load environment variables first
require('dotenv').config();

// Then load passport config that uses env variables
require('./config/passport');

const mongoose = require('mongoose');
const fs = require('fs');
const session = require('express-session');
const passport = require('passport');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger/swagger.json', 'utf8'));

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware session and Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-code',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

// Import and use routes
const categoryRoutes = require('./routes/categoryRoutes');
const entityRoutes = require('./routes/entity');
const courseRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);
app.use('/api/entities', entityRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoryRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'was not found. Please check the URL and try again.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred on the server. Please try again later.',
  });
});

// Connect to MongoDB then start server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connexion réussie à MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB :', err);
  });
