const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(express.json()); // for parsing application/json
app.use(cors());

// Routes
const usersRouter = require('./routes/users');
const condominiosRouter = require('./routes/condominios');
const combosRouter = require('./routes/combos');
const crudportonesRouter = require('./routes/crudportones');
const crudconfiguracionesRouter = require('./routes/crudconfiguraciones');
const crudestacionamientoRouter = require('./routes/crudestacionamientos');
const crudvehiculosRouter = require('./routes/crudvehiculos');
const crudvisitasRouter = require('./routes/crudvisitas');
const crudzonacoberturaRouter = require('./routes/crudzonacobertura');
const propiedadRouter = require('./routes/propiedad');



//const propiedadRouter = require('./routes/propiedad');

app.use('/users', usersRouter);
app.use('/condominios', condominiosRouter);
app.use('/condominios/add', condominiosRouter);
app.use('/combos', combosRouter);
app.use('/portones', crudportonesRouter);
app.use('/configuraciones', crudconfiguracionesRouter);
app.use('/estacionamientos', crudestacionamientoRouter);
app.use('/vehiculos', crudvehiculosRouter);
app.use('/visitas', crudvisitasRouter);
app.use('/zonacobertura', crudzonacoberturaRouter);
app.use('/propiedad', propiedadRouter);



// app.use('/propiedad', propiedadRouter);



app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});




// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
  });

module.exports = app;