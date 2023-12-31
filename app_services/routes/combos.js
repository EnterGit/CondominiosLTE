const express = require('express');
const router = express.Router();
const ComboController = require('../controllers/combos');


router.get('/regiones', ComboController.listarRegiones);
router.get('/comunas/:id', ComboController.listarComunas);

module.exports = router;
