const mongoose = require('mongoose');
const { Schema } = mongoose;

const registroActividadSchema = new Schema({
    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente', required: true },
    actividad: { type: Schema.Types.ObjectId, ref: 'Actividad', required: true },
    fecha_actividad: { type: Date, required: true },
    duracion_actividad: { type: Number, required: true },
    imagenes_actividad: { type: Array, required: true },
    imagenes_errores: { type: Array, required: false },
    cant_niveles: { type: Number, required: true },
    cant_errores: { type: Number, required: true },
    aprobacion: { type: Number, required: true },
    observacion_final: { type: String, required: false }
});

module.exports = mongoose.model('Registro_Actividad', registroActividadSchema);