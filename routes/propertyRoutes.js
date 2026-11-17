const express = require('express');
const router = express.Router();
const { createProperty, getProperties, getPropertyById } = require('../controllers/propertyController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getProperties)
  .post(protect, createProperty); // Protégé par authentification

router.route('/:id')
  .get(getPropertyById);

module.exports = router;