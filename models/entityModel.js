const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  quantity: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entity', entitySchema);
