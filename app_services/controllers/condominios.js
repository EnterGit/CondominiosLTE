const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const connect = require('../database/database2.js'); // Import the database connection

let db;

connect().then((connection) => {
    db = connection;
}).catch((error) => {
    console.error('Error creating connection to MySQL:', error);
});


// Create
//router.post('/add', (req, res) => {
exports.add = (req, res) => {
    let data = {
        Nombre: req.body.Nombre,
        Direccion: req.body.Direccion,
        NumeroDireccion: req.body.NumeroDireccion,
        CodigoPostal: req.body.CodigoPostal,
        Pais: req.body.Pais,
        Region: req.body.Region,
        Comuna: req.body.Comuna,
        Estado: req.body.Estado
    };
    let sql = "INSERT INTO condominios SET Nombre = ?, Direccion = ?, NumeroDireccion = ?, CodigoPostal = ?, Pais = ?, Region = ?, Comuna = ?, Estado = ?";
    
    db.execute(sql, [data.Nombre, data.Direccion, data.NumeroDireccion, data.CodigoPostal, data.Pais, data.Region, data.Comuna, data.Estado])
    .then(([results]) => {
        res.send({ message: 'Ingreso satisfactorio', data: results });
    })
    .catch((error) => {
      console.error('Error: ', error);
      res.status(500).send('Server error');
    });
};



// Read
// Get all condominios from db
//router.get('/leer', (req, res) => {
exports.leer = (req, res) => {
    db.execute("SELECT * FROM condominios")
        .then(([results]) => {
            res.send(results);
        })
        .catch((error) => {
            console.error('Error: ', error);
            res.status(500).send('Server error');
        });
};


// Update
router.put('/update/:id', (req, res) => {
    let data = req.body;
    db.execute("UPDATE condominios SET ? WHERE CondominioID = ?", [data, req.params.id])
        .then(([results]) => {
            res.send(results);
        })
        .catch((error) => {
            console.error('Error: ', error);
            res.status(500).send('Server error');
        });
});

// Delete
router.delete('/delete/:id', (req, res) => {
    db.execute("DELETE FROM condominios WHERE CondominioID = ?", [req.params.id])
        .then(([results]) => {
            res.send(results);
        })
        .catch((error) => {
            console.error('Error: ', error);
            res.status(500).send('Server error');
        });
});


//module.exports = router;