const Paciente = require('../models/paciente');

const pacienteCtrl = {};

pacienteCtrl.getPacientes = async (req, res) => {
    const pacientes = await Paciente.find()
    res.json(pacientes);
};

pacienteCtrl.createPaciente = async (req, res) => {
    const paciente = new Paciente({
        nombre: req.body.nombre,
        responsables: req.body.responsables,
        fecha_nacimiento: req.body.fecha_nacimiento,
        rut: req.body.rut,
        direccion: req.body.direccion,
        tel_fijo: req.body.tel_fijo,
        tel_celular: req.body.tel_celular,
        correo: req.body.correo,
        escolaridad: req.body.escolaridad,
        ocupacion: req.body.ocupacion,
        diagnostico: req.body.diagnostico,
        dias_hospital: req.body.dias_hospital,
        examenes_realizados: req.body.examenes_realizados,
        historico_clinica: req.body.historico_clinica,
        familiar_nombre: req.body.familiar_nombre,
        familiar_parentesco: req.body.familiar_parentesco,
    });
    await paciente.save();
    res.json({
        'status': 'Paciente guardado'
    });
};

pacienteCtrl.getPaciente = async (req, res) => {
    const paciente = await Paciente.findById(req.params.id);
    res.json(paciente);
};

pacienteCtrl.editPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = {
        nombre: req.body.nombre,
        responsables: req.body.responsables,
        fecha_nacimiento: req.body.fecha_nacimiento,
        rut: req.body.rut,
        direccion: req.body.direccion,
        tel_fijo: req.body.tel_fijo,
        tel_celular: req.body.tel_celular,
        correo: req.body.correo,
        escolaridad: req.body.escolaridad,
        ocupacion: req.body.ocupacion,
        diagnostico: req.body.diagnostico,
        dias_hospital: req.body.dias_hospital,
        examenes_realizados: req.body.examenes_realizados,
        historico_clinica: req.body.historico_clinica,
        familiar_nombre: req.body.familiar_nombre,
        familiar_parentesco: req.body.familiar_parentesco,
    };
    await Paciente.findByIdAndUpdate(id, { $set: paciente }, { new: true });
    res.json({ status: 'Paciente actualizado' });
};

pacienteCtrl.deletePaciente = async (req, res) => {
    await Paciente.findByIdAndRemove(req.params.id);
    res.json({ status: 'Paciente eliminado' });

};

module.exports = pacienteCtrl;