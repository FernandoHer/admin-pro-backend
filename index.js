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
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});