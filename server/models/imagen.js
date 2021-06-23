const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImagenSchema = new Schema({
    nombre: { type: String, required: true },
    silabas: { type: Number, required: true },
    categoria: { type: String, required: true },
    subcategoria: { type: String, required: true },
    fonema: { type: String, required: false },
    difono: { type: Array, required: false },
    urlImg: { type: String, required: true },
    urlAudio: { type: String, required: true },
    definicion: { type: String, required: true }
});

module.exports = mongoose.model('Imagen', ImagenSchema);