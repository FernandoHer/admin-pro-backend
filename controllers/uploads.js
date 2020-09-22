const path = require('path');
const fs = require('fs');


const { response } = require('express');
// cargo la aplicacion que me permite guardar el nombre único
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo de imagen a subir (O medico, o usuario, u hospital)
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'se debe escoger medicos, hospitales o usuarios'
        });
    }


    // Validar que exista una imagen
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Favor seleccione un archivo de imagen válido'
        });
    }

    // Procesar la imagen

    //Extraer la extención de archivo
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extensión

    const extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];

    if (!extensionesValidas.includes(extencionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Favor seleccione un archivo de imagen válido',
        });
    }

    // General nombre del archivo (con uuid)

    const nombreArchivo = `${ uuidv4() }.${extencionArchivo}`;



    // Path donde guardo el archivo de imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen al directorio de hostipal, medico o usuario

    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
    });

    //actualizar base de datos de imagen

    actualizarImagen(tipo, id, nombreArchivo);




    res.json({
        ok: true,
        msg: 'Archivo cargado exitosamente',
        nombreArchivo
    })
}
const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);


    // imagen por defecto

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }



}


module.exports = {
    fileUpload,
    retornaImagen
}