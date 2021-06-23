const RegistroActividad = require('../models/registro_actividad');

const registroActividadCtrl = {};

registroActividadCtrl.getRegistroActividades = async (req, res) => {
    const registroActividades = await RegistroActividad.find()
    res.json(registroActividades);
};

registroActividadCtrl.createRegistroActividad = async (req, res) => {
    const registroActividad = new RegistroActividad({
        paciente: req.body.paciente,
        actividad: req.body.actividad,
        fecha_actividad: req.body.fecha_actividad,
        duracion_actividad: req.body.duracion_actividad,
        imagenes_actividad: req.body.imagenes_actividad,
        imagenes_errores: req.body.imagenes_errores,
        cant_niveles: req.body.cant_niveles,
        cant_errores: req.body.cant_errores,
        aprobacion: req.body.aprobacion,
        observacion_final: req.body.observacion_final
    });
    await registroActividad.save();
    res.json({
        'status': 'Actividad guardada'
    });
};

registroActividadCtrl.getRegistroActividad = async (req, res) => {
    const registroActividad = await RegistroActividad.find().where('paciente').equals(req.params.paciente).populate('paciente').populate('actividad')
    res.json(registroActividad);
};

registroActividadCtrl.editRegistroActividad = async (req, res) => {
    const { id } = req.params;
    const registroActividad = {
        paciente: req.body.paciente,
        actividad: req.body.actividad,
        fecha_actividad: req.body.fecha_actividad,
        duracion_actividad: req.body.duracion_actividad,
        imagenes_actividad: req.body.imagenes_actividad,
        imagenes_errores: req.body.imagenes_errores,
        cant_niveles: req.body.cant_niveles,
        cant_errores: req.body.cant_errores,
        aprobacion: req.body.aprobacion,
        observacion_final: req.body.observacion_final
    };
    await RegistroActividad.findByIdAndUpdate(id, { $set: registroActividad }, { new: true });
    res.json({ status: 'Actividad actualizada' });
};

registroActividadCtrl.deleteRegistroActividad = async (req, res) => {
    await RegistroActividad.findByIdAndRemove(req.params.id);
    res.json({ status: 'Actividad eliminada' });

};

module.exports = registroActividadCtrl;