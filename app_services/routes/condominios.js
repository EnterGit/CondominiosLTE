const express = require('express');
const router = express.Router();
const CondominioController = require('../controllers/condominios');
const validaToken = require('../routes/validatoken');


router.get('/', validaToken, CondominioController.leer);
router.post('/add', validaToken, CondominioController.add);


module.exports = router;
