const express = require('express');
const router = express.Router();
const propiedadController = require('../controllers/crudpropiedadcontroller');
const validaToken = require('../routes/validatoken');


router.get('/', validaToken, propiedadController.leer);
// router.post('/add', validaToken, propiedadController.add);
// router.get('/:id', validaToken, propiedadController.showByCondominioID);
// router.post('/update', validaToken, propiedadController.update);
// router.post('/delete/:idCondominio', validaToken, propiedadController.delete);

module.exports = router;
