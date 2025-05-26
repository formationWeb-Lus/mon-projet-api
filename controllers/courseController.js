const Entity = require('../models/entityModel');

// GET all
exports.getAll = async (req, res) => {
  try {
    const entities = await Entity.find();
    res.status(200).json(entities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one
exports.getOne = async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (!entity) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(entity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
exports.create = async (req, res) => {
  try {
    const newEntity = new Entity(req.body);
    const saved = await newEntity.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT
exports.update = async (req, res) => {
  try {
    const updated = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    await Entity.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
