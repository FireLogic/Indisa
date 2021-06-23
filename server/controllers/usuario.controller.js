const Usuario = require('../models/usuario');

const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find()
    res.json(usuarios);
};

usuarioCtrl.createUsuario = async (req, res) => {
    const usuario = new Usuario({
        auth_id: req.body.auth_id,
        nombre: req.body.nombre,
        correo: req.body.correo,
        perfil: req.body.perfil
    });
    await usuario.save();
    res.json({
        'status': 'Usuario guardado'
    });
};

usuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuario.find().where('auth_id').equals(req.params.auth_id);
    res.json(usuario);
};

usuarioCtrl.editUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = {
        auth_id: req.body.auth_id,
        nombre: req.body.nombre,
        correo: req.body.correo,
        perfil: req.body.perfil
    };
    await Usuario.findByIdAndUpdate(id, { $set: usuario }, { new: true });
    res.json({ status: 'Usuario actualizado' });
};

usuarioCtrl.deleteUsuario = async (req, res) => {
    await Usuario.findByIdAndRemove(req.params.id);
    res.json({ status: 'Usuario eliminado' });

};

module.exports = usuarioCtrl;