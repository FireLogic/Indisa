const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    auth_id: { type: String, unique: true, required: true },
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    perfil: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);