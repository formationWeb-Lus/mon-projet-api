const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  language: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
