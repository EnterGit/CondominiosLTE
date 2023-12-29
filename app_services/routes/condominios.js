const express = require('express');
const router = express.Router();
const CondominioController = require('../controllers/condominios');
const validaToken = require('../routes/validatoken');


router.post('/add', validaToken, CondominioController.add);
router.post('/update', validaToken, CondominioController.update);
router.post('/delete/:idCondominio', validaToken, CondominioController.delete);
router.get('/', validaToken, CondominioController.leer);
router.get('/:id', validaToken, CondominioController.showByCondominioID);


module.exports = router;
