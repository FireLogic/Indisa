const mongoose = require('mongoose');
const { Schema } = mongoose;

const tareaSchema = new Schema({
    emisor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    receptor: { type: Schema.Types.ObjectId, ref: 'Paciente', required: true },
    fecha_envio: { type: Date, required: true },
    fecha_realizada: { type: Date, required: false },
    actividad: { type: Object, required: true },
    realizada: { type: Boolean, required: true }
});

module.exports = mongoose.model('Tarea', tareaSchema);