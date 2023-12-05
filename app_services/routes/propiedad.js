// propiedad.js
const express = require('express');
const router = express.Router();
const getDb = require('../database/database2');

// CREATE
router.post('/add1', async (req, res) => {
    const { CondominioID, NumeroDepartamento, Piso, MetrosCuadrados, Tipo } = req.body;
    const db = await getDb();
    await db.execute('INSERT INTO Propiedad (CondominioID, NumeroDepartamento, Piso, MetrosCuadrados, Tipo) VALUES (?, ?, ?, ?, ?)', [CondominioID, NumeroDepartamento, Piso, MetrosCuadrados, Tipo]);
    res.status(201).send();
});

// READ
//router.get('/:id', async (req, res) => {
router.get('/', async (req, res) => {    
    const db = await getDb();
    //const [rows] = await db.execute('SELECT * FROM Propiedad WHERE PropiedadID = ?', [req.params.id]);
    const [rows] = await db.execute('SELECT * FROM Propiedad');
    //res.send(rows[0]);
    res.send(rows);
});

// UPDATE
router.put('/:id', async (req, res) => {
    const { CondominioID, NumeroDepartamento, Piso, MetrosCuadrados, Tipo } = req.body;
    const db = await getDb();
    await db.execute('UPDATE Propiedad SET CondominioID = ?, NumeroDepartamento = ?, Piso = ?, MetrosCuadrados = ?, Tipo = ? WHERE PropiedadID = ?', [CondominioID, NumeroDepartamento, Piso, MetrosCuadrados, Tipo, req.params.id]);
    res.send();
});

// DELETE
router.delete('/:id', async (req, res) => {
    const db = await getDb();
    await db.execute('DELETE FROM Propiedad WHERE PropiedadID = ?', [req.params.id]);
    res.send();
});

module.exports = router;