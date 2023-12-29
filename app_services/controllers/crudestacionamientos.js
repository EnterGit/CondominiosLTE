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
    const { CondominioID, NumeroEstacionamiento, Disponible } = req.body;

    try {
        const [result] = await db.execute("INSERT INTO estacionamientos (CondominioID, NumeroEstacionamiento, Disponible) VALUES (?, ?, ?)", [CondominioID, NumeroEstacionamiento, Disponible]);
        console.log(`Estacionamiento insertado con ID: ${result.insertId}`);
        res.status(201).send({ id: result.insertId, message: 'Estacionamiento ingresado' });
    } catch (error) {
        console.error('Error al insertar estacionamiento: ', error);
        res.status(500).send({ message: 'No fue posible ingresar el estacionamiento', error: error });
    }
};

exports.update = async (req, res) => {
    const EstacionamientoID = req.params.id;
    const { CondominioID, NumeroEstacionamiento, Disponible } = req.body;

    try {
        const [result] = await db.execute("UPDATE estacionamientos SET CondominioID = ?, NumeroEstacionamiento = ?, Disponible = ? WHERE EstacionamientoID = ?", [CondominioID, NumeroEstacionamiento, Disponible, EstacionamientoID]);
        if (result.affectedRows > 0) {
            console.log(`Estacionamiento actualizado con ID: ${EstacionamientoID}`);
            res.status(200).send({ message: 'Estacionamiento actualizado' });
        } else {
            console.log('No se encontró ningún estacionamiento con el ID proporcionado');
            res.status(404).send({ message: 'Estacionamiento no encontrado' });
        }
    } catch (error) {
        console.log(`Error al actualizar estacionamiento: ${error}`);
        res.status(500).send({ message: 'No fue posible actualizar el estacionamiento', error: error });
    }
};


exports.delete = async (req, res) => {
    const EstacionamientoID = req.params.id;

    try {
        const [result] = await db.execute("DELETE FROM estacionamientos WHERE EstacionamientoID = ?", [EstacionamientoID]);
        if (result.affectedRows > 0) {
            console.log(`Estacionamiento eliminado con ID: ${EstacionamientoID}`);
            res.status(200).send({ message: 'Estacionamiento eliminado' });
        } else {
            console.log('No se encontró ningún estacionamiento con el ID proporcionado');
            res.status(404).send({ message: 'Estacionamiento no encontrado' });
        }
    } catch (error) {
        console.log(`Error al eliminar estacionamiento: ${error}`);
        res.status(500).send({ message: 'No fue posible eliminar el estacionamiento', error: error });
    }
};



exports.list = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT estacionamientos.EstacionamientoID, condominios.Nombre, condominios.Direccion, condominios.NumeroDireccion, estacionamientos.NumeroEstacionamiento, estacionamientos.Disponible FROM estacionamientos INNER JOIN condominios ON estacionamientos.CondominioID = condominios.CondominioID order by condominios.CondominioID");
        console.log(`Estacionamientos recuperados: ${rows.length}`);
        res.status(200).send(rows);
    } catch (error) {
        console.log(`Error al recuperar estacionamientos: ${error}`);
        res.status(500).send({ message: 'No fue posible recuperar los estacionamientos', error: error });
    }
};