const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActividadSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    tipo: { type: String, required: true },
    dificultad: { type: String, required: true }
});

module.exports = mongoose.model('Actividad', ActividadSchema);