const express = require('express');
const router = express.Router();
const CrudVehiculoController = require('../controllers/crudvehiculos');

router.post('/add', CrudVehiculoController.add);
router.put('/update/:id', CrudVehiculoController.update);
router.delete('/delete/:id', CrudVehiculoController.delete);
router.get('/list', CrudVehiculoController.list);
router.get('/listgetByCode/:id', CrudVehiculoController.listgetByCode);

module.exports = router;
