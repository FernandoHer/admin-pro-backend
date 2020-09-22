// lectura de variables de entorno
require('dotenv').config();

const express = require('express');

// instalar Cors
const cors = require('cors');


// direccion de base de datos
const { dbConnection } = require('./database/config');


// crear el servidor express
const app = express();

// configurar CORS
app.use(cors());

//Lectura y parser del body
app.use(express.json());

// Base de datos
dbConnection();


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});