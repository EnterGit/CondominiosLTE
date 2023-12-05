const express = require('express');
const router = express.Router();
const CrudConfiguracionesController = require('../controllers/crudconfiguraciones');


router.post('/add', CrudConfiguracionesController.add);
router.put('/update/:id', CrudConfiguracionesController.update);
router.delete('/delete/:id', CrudConfiguracionesController.delete);
router.get('/list', CrudConfiguracionesController.list);
//router.get('/list/:CondominioID', CrudConfiguracionesController.listByCondominioID);


module.exports = router;
