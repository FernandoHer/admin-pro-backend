/*
ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')


const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*
 ******************************************************
 ** OBTENER USUARIOS
 ******************************************************
 */

router.get('/', validarJWT, getUsuarios);

/*
 ******************************************************
 ** CREAR USUARIOS
 ******************************************************
 */

router.post(
    '/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuarios);

/*
 ******************************************************
 ** ACTUALIZAR USUARIOS
 ******************************************************
 */

router.put(
    '/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

/*
 ******************************************************
 ** BORRAR USUARIOS
 ******************************************************
 */

router.delete(
    '/:id',
    validarJWT,
    borrarUsuario
);

module.exports = router;