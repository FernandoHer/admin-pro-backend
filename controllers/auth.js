const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const validarCampos = require('../middlewares/validar-campos');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // verificando email

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'Verifique sus datos 1'
            });
        }

        //verificando password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Verifique sus datos 2'
            });

        }

        // Generar JWT token

        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuníquese con el administrador'
        })
    }
}

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const usuarioDB = await Usuario.findOne({ email });

        let usuario;

        if (!usuarioDB) {
            //Si no existe usuario, creamos uno nuevo
            usuario = new Usuario({
                nombre: name,
                email,
                password: 'xxxxx',
                img: picture,
                google: true,
            });
        } else {
            //existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardamos en base de datos
        console.log('Grabar', usuario);

        await usuario.save();

        // Generar JWT token

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }


}

module.exports = {
    login,
    googleSignIn
}