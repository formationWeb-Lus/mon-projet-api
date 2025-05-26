const express = require('express');
const router = express.Router();
const Entity = require('../models/entityModel'); // Assure-toi que ce chemin est correct

// GET all entities
router.get('/', async (req, res, next) => {
  try {
    const entities = await Entity.find(); // Récupère toutes les entités de MongoDB
    res.status(200).json(entities);       // Renvoie les données au client
  } catch (err) {
    next(err); // Envoie l'erreur au middleware global
  }
});

module.exports = router;

