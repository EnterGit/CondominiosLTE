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
    const { CondominioID, NombreConfiguracion, ValorConfiguracion } = req.body;

    try {
        const [result] = await db.execute("INSERT INTO configuraciones (CondominioID, NombreConfiguracion, ValorConfiguracion) VALUES (?, ?, ?)", [CondominioID, NombreConfiguracion, ValorConfiguracion]);
        console.log(`Configuración insertada con ID: ${result.insertId}`);
        res.status(201).send({ id: result.insertId, message: 'Configuración ingresada' });
    } catch (error) {
        console.error('Error al insertar configuración: ', error);
        res.status(500).send({ message: 'No fue posible ingresar la configuración', error: error });
    }
};

exports.update = async (req, res) => {
    const ConfiguracionID = req.params.id; // Extraer ConfiguracionID del parámetro de ruta
    const { CondominioID, NombreConfiguracion, ValorConfiguracion } = req.body;

    console.log(`ConfiguracionID: ${ConfiguracionID}`);
    console.log(`CondominioID: ${CondominioID}`);
    console.log(`NombreConfiguracion: ${NombreConfiguracion}`);
    console.log(`ValorConfiguracion: ${ValorConfiguracion}`);
    console.log(`req.body: ${req.body}`);


    // Verificar que todos los valores estén definidos
    if (ConfiguracionID === undefined || CondominioID === undefined || NombreConfiguracion === undefined || ValorConfiguracion === undefined) {
        console.log('Todos los campos son requeridos');
        return res.status(400).send({ message: 'Todos los campos son requeridos' });
    }

    console.log(`ConfiguracionID: ${ConfiguracionID}`);
    console.log(`CondominioID: ${CondominioID}`);
    console.log(`NombreConfiguracion: ${NombreConfiguracion}`);
    console.log(`ValorConfiguracion: ${ValorConfiguracion}`);

    try {
        const [result] = await db.execute("UPDATE configuraciones SET CondominioID = ?, NombreConfiguracion = ?, ValorConfiguracion = ? WHERE ConfiguracionID = ?", [CondominioID, NombreConfiguracion, ValorConfiguracion, ConfiguracionID]);
        if (result.affectedRows > 0) {
            console.log(`Configuración actualizada con ID: ${ConfiguracionID}`);
            res.status(200).send({ message: 'Configuración actualizada' });
        } else {
            console.log('No se encontró ninguna configuración con el ID proporcionado');
            res.status(404).send({ message: 'No se encontró ninguna configuración con el ID proporcionado' });
        }
    } catch (error) {
        console.log(`Error al actualizar configuración: ${error}`);
        res.status(500).send({ message: 'Error al actualizar configuración', error: error });
    }
};






exports.delete = async (req, res) => {
    const ConfiguracionID = req.params.id; // Extraer ConfiguracionID del parámetro de ruta

    console.log(`ConfiguracionID: ${ConfiguracionID}`);

    try {
        const [result] = await db.execute("DELETE FROM configuraciones WHERE ConfiguracionID = ?", [ConfiguracionID]);
        if (result.affectedRows > 0) {
            console.log(`Configuración eliminada con ID: ${ConfiguracionID}`);
            res.status(200).send({ message: 'Configuración eliminada' });
        } else {
            console.log('No se encontró ninguna configuración con el ID proporcionado');
            res.status(404).send({ message: 'Configuración no encontrada' });
        }
    } catch (error) {
        console.log(`Error al eliminar configuración: ${error}`);
        res.status(500).send({ message: 'No fue posible eliminar la configuración', error: error });
    }
};


exports.list = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM configuraciones");
        res.status(200).send(rows);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send({ message: 'No fue posible listar las configuraciones', error: error });
    }
};

