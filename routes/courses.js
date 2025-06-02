const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const isAuthenticated = require('../middlewares/isAuthenticated');

// POST /api/courses - créer un cours (protégé par middleware)
router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const course = new Course(req.body);
    const saved = await course.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// GET /api/courses - lister tous les cours
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    next(err);
  }
});

// GET /api/courses/:id - obtenir un cours
router.get('/:id', async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    next(err);
  }
});

// PUT /api/courses/:id - modifier un cours
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Course not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/courses/:id - supprimer un cours
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
