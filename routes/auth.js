/*
ruta: /api/auth
*/

const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Login de usuario
router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

// login de Google
router.post(
    '/google/', [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    googleSignIn
);



module.exports = router;