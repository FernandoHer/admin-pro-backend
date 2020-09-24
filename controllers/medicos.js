const { response } = require('express');

const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');


    res.json({
        ok: true,
        medicos
    });
}


const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }


}
const actualizarMedico = async(req, res = response) => {

    const id = req.params.id; // id del medico a actualizar
    const uid = req.uid; // uid del usuario que actualiza

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'El medico no fue encontrado con el id'
            });
        }

        const cambioMedico = {
            ...req.body,
            usuario: uid,
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambioMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador (actualizar médico)'
        });

    }

}
const borrarMedico = async(req, res = response) => {

    const id = req.params.id; // id del medico a actualizar

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'El medico no fue encontrado con el id'
            });
        }


        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador (actualizar médico)'
        });

    }


}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}