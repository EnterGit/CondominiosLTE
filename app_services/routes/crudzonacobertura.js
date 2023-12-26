const express = require('express');
const router = express.Router();
//genera la dependecia con el controller
const crudZonaCoberturaController = require('../controllers/crudzonacobertura');

router.post('/add', crudZonaCoberturaController.add);
router.put('/update/:id', crudZonaCoberturaController.update);
router.delete('/delete/:id', crudZonaCoberturaController.delete);
router.get('/listbyCondominioID/:id', crudZonaCoberturaController.listByCondominioID);
router.get('/list', crudZonaCoberturaController.list);
module.exports = router;