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

// GET all propiedades
exports.leer = (req, res) => {
    db.execute("SELECT * FROM propiedad INNER JOIN condominios ON propiedad.CondominioID = condominios.CondominioID order by propiedad.PropiedadID;")
        .then(([results]) => {
            res.send(results);
        })
        .catch((error) => {
            console.error('Error: ', error);
            res.status(500).send('Server error');
        });
};