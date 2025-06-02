const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  language: { type: String, required: true },
  description: { type: String, required: true }
});

// Vérifie si le modèle existe déjà, sinon le crée
module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
