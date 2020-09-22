/*
ruta: /api/todo/:busqueda
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getTodo,
    getDocumentosColeccion
} = require('../controllers/busquedas');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*
 ******************************************************
 ** OBTENER TODOS LOS NOMBRES EN LAS BASES DE DATOS
 ******************************************************
 */

router.get('/:busqueda', validarJWT, getTodo);


/*
 ******************************************************
 ** OBTENER TODOS LOS NOMBRES POR COLECCION
 ******************************************************
 */

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = router;