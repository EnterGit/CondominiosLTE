const express = require('express');
const router = express.Router();
const CondominioController = require('../controllers/condominios');
const validaToken = require('../routes/validatoken');


router.get('/', validaToken, CondominioController.leer);
router.post('/add', validaToken, CondominioController.add);
router.get('/:id', validaToken, CondominioController.showByCondominioID);
router.post('/update', validaToken, CondominioController.update);
router.post('/delete/:idCondominio', validaToken, CondominioController.delete);

module.exports = router;
