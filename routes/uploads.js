/*
ruta: /api/uploads/
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

/*
 ******************************************************
 ** OBTENER LOS ARCHIVOS A SUBIR

 ******************************************************
 */

router.put('/:tipo/:id', validarJWT, fileUpload);


/*
 ******************************************************
 ** LEER LOS ARCHIVOS A SUBIR

 ******************************************************
 */

router.get('/:tipo/:foto', retornaImagen);

module.exports = router;