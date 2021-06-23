const Tarea = require('../models/tarea');

const tareaCtrl = {};

tareaCtrl.getTareas = async (req, res) => {
    const tareas = await Tarea.find()
    res.json(tareas);
};

tareaCtrl.createTarea = async (req, res) => {
    const tarea = new Tarea({
        emisor: req.body.emisor,
        receptor: req.body.receptor,
        fecha_envio: req.body.fecha_envio,
        //fecha_realizada: req.body.fecha_realizada,
        actividad: req.body.actividad,
        realizada: req.body.realizada,
    });
    await tarea.save();
    res.json({
        'status': 'Tarea guardada'
    });
};

tareaCtrl.getTarea = async (req, res) => {
    const tarea = await Tarea.find().where('receptor').equals(req.params.receptor).populate('receptor')
    res.json(tarea);
};

tareaCtrl.editTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = {
        emisor: req.body.emisor,
        receptor: req.body.receptor,
        fecha_envio: req.body.fecha_envio,
        fecha_realizada: req.body.fecha_realizada,
        actividad: req.body.actividad,
        realizada: req.body.realizada,
    };
    await Tarea.findByIdAndUpdate(id, { $set: tarea }, { new: true });
    res.json({ status: 'Tarea actualizada' });
};

tareaCtrl.deleteTarea = async (req, res) => {
    await Tarea.findByIdAndRemove(req.params.id);
    res.json({ status: 'Tarea eliminada' });

};

module.exports = tareaCtrl;