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


//crea un metodo para listar las regiones
exports.listarRegiones = (req, res) => {
    db.execute("SELECT * FROM tregion")
        .then(([results]) => {
            res.send(results);
        })
        .catch((error) => {
            console.error('Error: ', error);
            res.status(500).send('Server error');
        });
};


//crea un metodo para listar las comunas según el id de region
exports.listarComunas = (req, res) => {
    console.log(req.params.id);
    db.execute("SELECT * FROM tcomuna WHERE REGION_ID = ?", [req.params.id])
        .then(([results]) => {
            res.send(results);
        })
        .catch((error) => {
            console.error('Error: ', error);
            res.status(500).send('Server error');
        });
};

