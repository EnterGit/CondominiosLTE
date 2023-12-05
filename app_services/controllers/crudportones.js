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


// Create a method to insert a new gate
exports.add = async (req, res) => {
    const { CondominioID, Descripcion } = req.body;

    try {
        const [result] = await db.execute("INSERT INTO portones (CondominioID, Descripcion) VALUES (?, ?)", [CondominioID, Descripcion]);
        res.status(201).send({ id: result.insertId, message: 'Portón ingresado' });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send({ message: 'Portón no fue ingresado', error: error });
    }
};

exports.update = async (req, res) => {
    const { CondominioID, Descripcion } = req.body;
    const { PortonID } = req.params;

    try {
        const [result] = await db.execute("UPDATE portones SET CondominioID = ?, Descripcion = ? WHERE PortonID = ?", [CondominioID, Descripcion, PortonID]);
        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Portón actualizado' });
        } else {
            res.status(404).send({ message: 'Portón no encontrado' });
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send({ message: 'Portón no fue actualizado', error: error });
    }
};


exports.delete = async (req, res) => {
    const { PortonID } = req.params;

    console.log(`Attempting to delete porton with ID: ${PortonID}`);

    try {
        const [result] = await db.execute("DELETE FROM portones WHERE PortonID = ?", [PortonID]);
        if (result.affectedRows > 0) {
            console.log(`Porton with ID: ${PortonID} was deleted`);
            res.status(200).send({ message: 'Portón eliminado' });
        } else {
            console.log(`Porton with ID: ${PortonID} not found`);
            res.status(404).send({ message: 'Portón no encontrado' });
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send({ message: 'No fue posible eliminar el portón', error: error });
    }
};



exports.listByCondominioID = async (req, res) => {
    const { CondominioID } = req.params;

    try {
        const [rows] = await db.execute("SELECT * FROM portones WHERE CondominioID = ?", [CondominioID]);
        res.status(200).send(rows);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send({ message: 'No fue posible obtener la lista de portones', error: error });
    }
};

