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
exports.add = (req, res) => {
    let data = {
        Nombre: req.body.NombreCondominio,
        Direccion: req.body.DireccionCondominio,
        NumeroDireccion: req.body.NumeroCondominio,
       // CodigoPostal: req.body.CodigoPostal,        
        Region: req.body.RegionCondominio,
        Comuna: req.body.ComunaCondominio,
        // IdCondominio: req.body.IdCondominio
        // Estado: req.body.Estado
    };
    // let sql = "INSERT INTO condominios SET Nombre = ?, Direccion = ?, NumeroDireccion = ?, CodigoPostal = ?, Pais = ?, Region = ?, Comuna = ?, Estado = ?";
    //db.execute(sql, [data.Nombre, data.Direccion, data.NumeroDireccion, data.CodigoPostal, data.Pais, data.Region, data.Comuna, data.Estado])
    let sql = "INSERT INTO condominios SET Nombre = ?, Direccion = ?, NumeroDireccion = ?, Region = ?, Comuna = ? ";

    db.execute(sql, [data.Nombre, data.Direccion, data.NumeroDireccion, data.Region, data.Comuna])
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
    db.execute("SELECT * FROM condominios INNER JOIN tregion ON condominios.Region = tregion.REGION_ID INNER JOIN tcomuna ON condominios.Comuna = tcomuna.COMUNA_ID order by condominios.CondominioID")
            .then(([results]) => {
            res.send(results);
            console.log(results);
        })
        .catch((error) => {
            console.error('Error: ', error);
            res.status(500).send('Server error');
        });
};


// Update
exports.update = async (req, res) => {
    console.log('req.body: ', req.body);
    let data = {
        Nombre: req.body.NombreCondominio,
        Direccion: req.body.DireccionCondominio,
        NumeroDireccion: req.body.NumeroCondominio,
        Region: req.body.RegionCondominio,
        Comuna: req.body.ComunaCondominio,
        IdCondominio: req.body.IdCondominio
        // Estado: req.body.Estado
    };
    
    let sql = "UPDATE condominios SET Nombre = ?, Direccion = ?, NumeroDireccion = ?, Region = ?, Comuna = ? WHERE CondominioID = ?";
    try {
        const [result] = await db.execute(sql, [data.Nombre, data.Direccion, data.NumeroDireccion, data.Region, data.Comuna, data.IdCondominio]);
        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Condominio actualizado' });
        } else {
            res.status(404).send({ message: 'Condominio no encontrado' });
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send({ message: 'Condominio no fue actualizado', error: error });
    }
};


// delete a condominio
exports.delete = async (req, res) => {
    const CondominioID = req.params.id;
    try {
        const [result] = await db.execute("DELETE FROM condominios WHERE CondominioID = ?", [CondominioID]);
        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Condominio eliminado' });
        } else {
            res.status(404).send({ message: 'Condominio no encontrado' });
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send({ message: 'Condominio no fue eliminado', error: error });
    }
};



// Get a single condominio from db
exports.showByCondominioID = async (req, res) => {
    const CondominioID = req.params.id;
    try {
        const [rows] = await db.execute("SELECT * FROM condominios WHERE CondominioID = ?", [CondominioID]);
        res.status(200).send(rows);
    } catch (error) {
        console.log(`Error al recuperar datos: ${error}`);
        res.status(500).send({ message: 'No fue posible recuperar los datos', error: error });
    }
};


//module.exports = router;