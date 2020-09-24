/*
ruta: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales')

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*
 ******************************************************
 ** OBTENER HOSPITALES
 ******************************************************
 */

router.get('/', getHospitales);

/*
 ******************************************************
 ** CREAR HOSPITALES
 ******************************************************
 */

router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre del Hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

/*
 ******************************************************
 ** ACTUALIZAR HOSPITALES
 ******************************************************
 */

router.put(
    '/:id', [
        validarJWT,
        check('nombre', 'El nombre del Hospital es necesario').not().isEmpty(),
        validarCampos,
    ],
    actualizarHospital
);

/*
 ******************************************************
 ** BORRAR HOSPITALES
 ******************************************************
 */

router.delete(
    '/:id',
    validarJWT,
    borrarHospital
);

module.exports = router;