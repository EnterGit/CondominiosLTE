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
    const { Rut, Placa } = req.body;

    try {
        const [result] = await db.execute("INSERT INTO vehiculos (Rut, Placa) VALUES (?, ?)", [Rut, Placa]);
        console.log(`Vehiculo insertado con ID: ${result.insertId}`);
        res.status(201).send({ id: result.insertId, message: 'Vehiculo ingresado' });
    } catch (error) {
        console.error('Error al insertar vehiculo: ', error);
        res.status(500).send({ message: 'No fue posible ingresar el vehiculo', error: error });
    }
};


exports.update = async (req, res) => {
    const VehiculoID = req.params.id;
    const { Rut, Placa } = req.body;

    try {
        const [result] = await db.execute("UPDATE vehiculos SET Rut = ?, Placa = ? WHERE VehiculoID = ?", [Rut, Placa, VehiculoID]);
        if (result.affectedRows > 0) {
            console.log(`Vehiculo actualizado con ID: ${VehiculoID}`);
            res.status(200).send({ message: 'Vehiculo actualizado' });
        } else {
            console.log('No se encontró ningún vehiculo con el ID proporcionado');
            res.status(404).send({ message: 'Vehiculo no encontrado' });
        }
    } catch (error) {
        console.log(`Error al actualizar vehiculo: ${error}`);
        res.status(500).send({ message: 'No fue posible actualizar el vehiculo', error: error });
    }
};


exports.delete = async (req, res) => {
    const VehiculoID = req.params.id;

    try {
        const [result] = await db.execute("DELETE FROM vehiculos WHERE VehiculoID = ?", [VehiculoID]);
        if (result.affectedRows > 0) {
            console.log(`Vehiculo eliminado con ID: ${VehiculoID}`);
            res.status(200).send({ message: 'Vehiculo eliminado' });
        } else {
            console.log('No se encontró ningún vehiculo con el ID proporcionado');
            res.status(404).send({ message: 'Vehiculo no encontrado' });
        }
    } catch (error) {
        console.log(`Error al eliminar vehiculo: ${error}`);
        res.status(500).send({ message: 'No fue posible eliminar el vehiculo', error: error });
    }
};


//Todo: hay que replantear el listar por que no lista vehiculos por condominios
exports.list = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM vehiculos");
        console.log(`Vehiculos recuperados: ${rows.length}`);
        res.status(200).send(rows);
    } catch (error) {
        console.log(`Error al recuperar vehiculos: ${error}`);
        res.status(500).send({ message: 'No fue posible recuperar los vehiculos', error: error });
    }
};

exports.listgetByCode = async (req, res) => {
    const CondominioID = req.params.id;

    try {
        const [rows] = await db.execute("SELECT V.VehiculoID, V.Rut, V.Placa, C.Nombre, C.Direccion, U.Nombres, U.Apellidos FROM vehiculos AS V JOIN condominios C ON V.CondominioID = C.CondominioID JOIN usuarios U ON V.Rut = U.Rut WHERE V.CondominioID = ?", [CondominioID]);
        console.log(`Vehiculos recuperada¿os: ${rows.length}`);
        res.status(200).send(rows);
    } catch (error) {
        console.log(`Error al recuperar vehiculos: ${error}`);
        res.status(500).send({ message: 'No fue posible recuperar las vehiculos', error: error });
    }
};



