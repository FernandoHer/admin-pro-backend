const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
// const { delete } = require('../routes/usuarios');

/*
 ******************************************************
 ** OBTENER USUARIOS
 ******************************************************
 */

const getUsuarios = async(req, res) => {


    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([

        Usuario.find({}, 'nombre email role  img google')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments()

    ]);


    res.json({
        ok: true,
        usuarios,
        total
    });
}


/*
 ******************************************************
 ** CREAR USUARIOS
 ******************************************************
 */


const crearUsuarios = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado',
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(); //numero aleatorio
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardo el usuario con la contraseña encriptada
        await usuario.save();

        // Generar JWT token

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}


/*
 ******************************************************
 ** ACTUALIZAR USUARIOS
 ******************************************************
 */


const actualizarUsuario = async(req, res = response) => {


    //TODO validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones

        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo'
                });
            }

        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error actualizando usuario'
        })

    }

}

/*
 ******************************************************
 ** BORRAR USUARIOS
 ******************************************************
 */
const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario que desea borrar',
            });
        }

        // Borrando
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario Eliminado',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error borrando usuario',
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario,
}