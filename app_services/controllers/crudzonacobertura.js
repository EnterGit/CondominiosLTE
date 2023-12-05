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


exports.add = async (req, res) => {
    const { CondominioID, LatLng_A, LatLng_B, LatLng_C, LatLng_D } = req.body;

    try {
        const [result] = await db.execute("INSERT INTO zonacobertura (CondominioID, LatLng_A, LatLng_B, LatLng_C, LatLng_D) VALUES (?, ?, ?, ?, ?)", [CondominioID, LatLng_A, LatLng_B, LatLng_C, LatLng_D]);
        console.log(`Zona de cobertura insertada con ID: ${result.insertId}`);
        res.status(201).send({ id: result.insertId, message: 'Zona de cobertura ingresada' });
    } catch (error) {
        console.error('Error al insertar zona de cobertura: ', error);
        res.status(500).send({ message: 'No fue posible ingresar la zona de cobertura', error: error });
    }
};


exports.update = async (req, res) => {
    const ZonaCoberturaID = req.params.id;
    const { CondominioID, LatLng_A, LatLng_B, LatLng_C, LatLng_D } = req.body;

    try {
        const [result] = await db.execute("UPDATE zonacobertura SET CondominioID = ?, LatLng_A = ?, LatLng_B = ?, LatLng_C = ?, LatLng_D = ? WHERE ZonaCoberturaID = ?", [CondominioID, LatLng_A, LatLng_B, LatLng_C, LatLng_D, ZonaCoberturaID]);
        if (result.affectedRows > 0) {
            console.log(`Zona de cobertura actualizada con ID: ${ZonaCoberturaID}`);
            res.status(200).send({ message: 'Zona de cobertura actualizada' });
        } else {
            console.log('No se encontró ninguna zona de cobertura con el ID proporcionado');
            res.status(404).send({ message: 'Zona de cobertura no encontrada' });
        }
    } catch (error) {
        console.log(`Error al actualizar zona de cobertura: ${error}`);
        res.status(500).send({ message: 'No fue posible actualizar la zona de cobertura', error: error });
    }
};

exports.delete = async (req, res) => {
    const ZonaCoberturaID = req.params.id;

    try {
        const [result] = await db.execute("DELETE FROM zonacobertura WHERE ZonaCoberturaID = ?", [ZonaCoberturaID]);
        if (result.affectedRows > 0) {
            console.log(`Zona de cobertura eliminada con ID: ${ZonaCoberturaID}`);
            res.status(200).send({ message: 'Zona de cobertura eliminada' });
        } else {
            console.log('No se encontró ninguna zona de cobertura con el ID proporcionado');
            res.status(404).send({ message: 'Zona de cobertura no encontrada' });
        }
    } catch (error) {
        console.log(`Error al eliminar zona de cobertura: ${error}`);
        res.status(500).send({ message: 'No fue posible eliminar la zona de cobertura', error: error });
    }
};


exports.listByCondominioID = async (req, res) => {
    const CondominioID = req.params.id;

    try {
        const [rows] = await db.execute("SELECT * FROM zonacobertura WHERE CondominioID = ?", [CondominioID]);
        console.log(`Zonas de cobertura recuperadas: ${rows.length}`);
        res.status(200).send(rows);
    } catch (error) {
        console.log(`Error al recuperar zonas de cobertura: ${error}`);
        res.status(500).send({ message: 'No fue posible recuperar las zonas de cobertura', error: error });
    }
};


