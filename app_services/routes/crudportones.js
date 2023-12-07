const express = require('express');
const router = express.Router();
const CrudPortonesController = require('../controllers/crudportones');



router.post('/add', CrudPortonesController.add);
router.put('/update/:PortonID', CrudPortonesController.update);
router.delete('/delete/:PortonID', CrudPortonesController.delete);
router.get('/list/:CondominioID', CrudPortonesController.listByCondominioID);
//getbycode
router.get('/getbycode/:PortonID', CrudPortonesController.getByCode);








module.exports = router;
