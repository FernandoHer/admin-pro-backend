/*
Medicos
ruta: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos')

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*
 ******************************************************
 ** OBTENER MEDICOS
 ******************************************************
 */

router.get('/', getMedicos);

/*
 ******************************************************
 ** CREAR MEDICOS
 ******************************************************
 */

router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre del Médico es necesario').not().isEmpty(),
        check('hospital', 'El Hospital id debe ser válido').isMongoId(),
        validarCampos,
    ],
    crearMedico
);

/*
 ******************************************************
 ** ACTUALIZAR MEDICOS
 ******************************************************
 */

router.put(
    '/:id', [

    ],
    actualizarMedico
);

/*
 ******************************************************
 ** BORRAR MEDICOS
 ******************************************************
 */

router.delete(
    '/:id',
    borrarMedico
);

module.exports = router;