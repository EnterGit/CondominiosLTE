const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const db  = require('../database/database.js');

exports.login = (req, res) => {


  console.log(req.body.correo);
  console.log(req.body.password);

      db.query("SELECT * FROM usuarios WHERE CorreoElectronico = ?", [req.body.correo], (err, users) => {
        if (err) {
          console.error('MySQL error:', err);
          res.status(500).send('Database error');
          return;
        }
    
        if (users.length == 0) {
          res.status(400).send('Username does not exist');
          return;
        }
    
        // Comprueba la contraseña
        bcrypt.compare(req.body.password, users[0].Contrasena, function(err, result) {
         /* if(err) {
            console.error('Bcrypt error:', err);
            res.status(500).send('Encryption error');
            return;
          }
    */
        // Crea un token
          if(result) {
            //res.status(200).send('Login successful');
    
          const token = jwt.sign({ 
            id: users[0].Rut,
            Rut: users[0].Rut,
            perfil: 'admin',
            nombre: users[0].Nombre,
            correo: users[0].CorreoElectronico,
            ROLE: 'admin',
            perfil: 'conserje'
          }, 'Pepito2023', { expiresIn: '8h' });
          res.json(token);
    
          } else {
            res.status(400).send('Incorrect password');
        //  res.json({ error: 'Contraseña incorrecta' });
         
        }

        });
      });
}

// Valida el token
router.get('/validaToken', (req, res) => {
  const bearerToken = req.headers['authorization'];
  const token = bearerToken && bearerToken.split(' ')[1];

  try {
      jwt.verify(token, 'Pepito2023');
      // Si no se lanza ningún error, entonces el token es válido y no ha expirado
      res.send('Protected content');
  } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
          res.status(401).send('Token has expired');
      } else {
          // Otro error
          res.status(500).send('Error verifying token');
      }
  }
});

// Create
router.post('/add', (req, res) => {
  // Check if username already exists
  db.query("SELECT * FROM usuarios WHERE username = ?", [req.body.username], (err, users) => {
    if (err) {
      console.error('MySQL error:', err);
      res.status(500).send('Database error');
      return;
    }

    if (users.length > 0) {
      res.status(400).send('Username already exists');
      return;
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if(err) {
        console.error('Bcrypt error:', err);
        res.status(500).send('Encryption error');
        return;
      }

      let data = {
        username: req.body.username,
        password: hash, // store the hashed password
        createdAt: new Date(),
        updatedAt: new Date()
      };

      let sql = "INSERT INTO users SET ?";
      db.query(sql, data, (err, results) => {
        if(err) {
          console.error('MySQL error:', err);
          res.status(500).send('Database error');
          return;
        }
        //res.send(results);
        res.status(200).send('Username Creado exitosamente');
      });
    });
  });
});

// Read
router.get('/', (req, res) => {
  let sql = "SELECT * FROM usuarios";
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

// Update
router.put('/update', (req, res) => {
  let sql = "UPDATE usuarios SET name = ?, age = ? WHERE id = ?";
  db.query(sql, [req.body.name, req.body.age, req.body.id], (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

// Delete
router.delete('/delete', (req, res) => {
  let sql = "DELETE FROM usuarios WHERE id = ?";
  db.query(sql, [req.body.id], (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

// module.exports = router;
