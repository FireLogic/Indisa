const Actividad = require('../models/actividad');

const actividadCtrl = {};

actividadCtrl.getActividades = async (req, res) => {
    const actividades = await Actividad.find()
    res.json(actividades);
};

actividadCtrl.createActividad = async (req, res) => {
    const actividad = new Actividad({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        dificultad: req.body.dificultad
    });
    await actividad.save();
    res.json({
        'status': 'Actividad guardada'
    });
};

actividadCtrl.getActividad = async (req, res) => {
    const actividad = await Actividad.findById(req.params.id);
    res.json(actividad);
};

actividadCtrl.editActividad = async (req, res) => {
    const { id } = req.params;
    const actividad = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        dificultad: req.body.dificultad,
    };
    await Actividad.findByIdAndUpdate(id, { $set: actividad }, { new: true });
    res.json({ status: 'Actividad actualizada' });
};

actividadCtrl.deleteActividad = async (req, res) => {
    await Actividad.findByIdAndRemove(req.params.id);
    res.json({ status: 'Actividad eliminada' });

};

module.exports = actividadCtrl;