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

// Base de datos
dbConnection();


// Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: "Respuesta del Server"
    });
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});