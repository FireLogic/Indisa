const mongoose = require('mongoose');
const { Schema } = mongoose;

const PacienteSchema = new Schema({
    nombre: { type: String, required: true },
    responsables: { type: Array, required: true },
    fecha_nacimiento: { type: Date, required: true },
    rut: { type: String, required: true },
    direccion: { type: String, required: true },
    tel_fijo: { type: Number, required: false },
    tel_celular: { type: Number, required: true },
    correo: { type: String, required: true },
    escolaridad: { type: String, required: false },
    ocupacion: { type: String, required: false },
    diagnostico: { type: String, required: true },
    dias_hospital: { type: Number, required: true },
    examenes_realizados: { type: String, required: false },
    historico_clinica: { type: String, required: true },
    familiar_nombre: { type: String, required: true },
    familiar_parentesco: { type: String, required: true }
});

module.exports = mongoose.model('Paciente', PacienteSchema);