const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 }
}, { timestamps: true }); // auto-manage createdAt & updatedAt

module.exports = mongoose.model('Entity', entitySchema);

