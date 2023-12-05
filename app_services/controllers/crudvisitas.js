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
    const { Rut, NombreVisitante, FechaHoraEntrada, FechaHoraSalida, PropiedadID, Placa } = req.body;

    try {
        const [result] = await db.execute("INSERT INTO visitas (Rut, NombreVisitante, FechaHoraEntrada, FechaHoraSalida, PropiedadID, Placa) VALUES (?, ?, ?, ?, ?, ?)", [Rut, NombreVisitante, FechaHoraEntrada, FechaHoraSalida, PropiedadID, Placa]);
        console.log(`Visita insertada con ID: ${result.insertId}`);
        res.status(201).send({ id: result.insertId, message: 'Visita ingresada' });
    } catch (error) {
        console.error('Error al insertar visita: ', error);
        res.status(500).send({ message: 'No fue posible ingresar la visita', error: error });
    }
};

exports.update = async (req, res) => {
    const VisitaID = req.params.id;
    const { Rut, NombreVisitante, FechaHoraEntrada, FechaHoraSalida, PropiedadID, Placa } = req.body;

    try {
        const [result] = await db.execute("UPDATE visitas SET Rut = ?, NombreVisitante = ?, FechaHoraEntrada = ?, FechaHoraSalida = ?, PropiedadID = ?, Placa = ? WHERE VisitaID = ?", [Rut, NombreVisitante, FechaHoraEntrada, FechaHoraSalida, PropiedadID, Placa, VisitaID]);
        if (result.affectedRows > 0) {
            console.log(`Visita actualizada con ID: ${VisitaID}`);
            res.status(200).send({ message: 'Visita actualizada' });
        } else {
            console.log('No se encontró ninguna visita con el ID proporcionado');
            res.status(404).send({ message: 'Visita no encontrada' });
        }
    } catch (error) {
        console.log(`Error al actualizar visita: ${error}`);
        res.status(500).send({ message: 'No fue posible actualizar la visita', error: error });
    }
};


exports.delete = async (req, res) => {
    const VisitaID = req.params.id;

    try {
        const [result] = await db.execute("DELETE FROM visitas WHERE VisitaID = ?", [VisitaID]);
        if (result.affectedRows > 0) {
            console.log(`Visita eliminada con ID: ${VisitaID}`);
            res.status(200).send({ message: 'Visita eliminada' });
        } else {
            console.log('No se encontró ninguna visita con el ID proporcionado');
            res.status(404).send({ message: 'Visita no encontrada' });
        }
    } catch (error) {
        console.log(`Error al eliminar visita: ${error}`);
        res.status(500).send({ message: 'No fue posible eliminar la visita', error: error });
    }
};



exports.listByPropiedadID = async (req, res) => {
    const PropiedadID = req.params.id;

    try {
        const [rows] = await db.execute("SELECT * FROM visitas WHERE PropiedadID = ?", [PropiedadID]);
        console.log(`Visitas recuperadas: ${rows.length}`);
        res.status(200).send(rows);
    } catch (error) {
        console.log(`Error al recuperar visitas: ${error}`);
        res.status(500).send({ message: 'No fue posible recuperar las visitas', error: error });
    }
};