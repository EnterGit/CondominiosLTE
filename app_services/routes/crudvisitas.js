const express = require('express');
const router = express.Router();
const crudvisitasController = require('../controllers/crudvisitas');

router.post('/add', crudvisitasController.add);
router.put('/update/:id', crudvisitasController.update);
router.delete('/delete/:id', crudvisitasController.delete);
router.get('/list/:id', crudvisitasController.listByPropiedadID);

module.exports = router;



