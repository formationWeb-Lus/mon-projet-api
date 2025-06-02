const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);


// Exemple de protection d'une route
router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    // Logique pour créer un cours
  } catch (err) {
    next(err);
  }
});


module.exports = router;
