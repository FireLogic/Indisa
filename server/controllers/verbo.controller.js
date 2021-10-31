const Verbo = require('../models/verbo');

const verboCtrl = {};

verboCtrl.getVerbos = async (req, res) => {
    const verbos = await Verbo.find()
    res.json(verbos);
};

verboCtrl.createVerbo = async (req, res) => {
    const verbo = new Verbo({
        nombre: req.body.nombre
    });
    await verbo.save();
    res.json({
        'status': 'Verbo guardado'
    });
};

verboCtrl.getVerbo = async (req, res) => {
    const verbo = await Verbo.findById(req.params.id);
    res.json(verbo);
};

verboCtrl.editVerbo = async (req, res) => {
    const { id } = req.params;
    const verbo = {
        nombre: req.body.nombre
    };
    await Verbo.findByIdAndUpdate(id, { $set: verbo }, { new: true });
    res.json({ status: 'Verbo actualizado' });
};

verboCtrl.deleteVerbo = async (req, res) => {
    await Verbo.findByIdAndRemove(req.params.id);
    res.json({ status: 'Verbo eliminado' });
};

module.exports = verboCtrl; 