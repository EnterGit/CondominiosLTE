const express = require('express');
const router = express.Router();
const CrudEstacionamientoController = require('../controllers/crudestacionamientos');
const validaToken = require('../routes/validatoken');


router.post('/add', CrudEstacionamientoController.add);
router.post('/update', CrudEstacionamientoController.update);
router.post('/delete', CrudEstacionamientoController.delete);
router.get('/list', CrudEstacionamientoController.list);
router.get('/:id', validaToken, CrudEstacionamientoController.showByEstacionamientoID);


module.exports = router;
