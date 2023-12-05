const express = require('express');
const router = express.Router();
const CrudEstacionamientoController = require('../controllers/crudestacionamientos');

router.post('/add', CrudEstacionamientoController.add);
router.put('/update/:id', CrudEstacionamientoController.update);
router.delete('/delete/:id', CrudEstacionamientoController.delete);
router.get('/list', CrudEstacionamientoController.list);


module.exports = router;
