const Imagen = require('../models/imagen');

const imagenCtrl = {};

imagenCtrl.getImagenes = async (req, res) => {
    const imagenes = await Imagen.find()
    res.json(imagenes);
};

imagenCtrl.createImagen = async (req, res) => {
    const imagen = new Imagen({
        nombre: req.body.nombre,
        silabas: req.body.silabas,
        categoria: req.body.categoria,
        subcategoria: req.body.subcategoria,
        fonema: req.body.fonema,
        difono: req.body.difono,
        urlImg: req.body.urlImg,
        urlAudio: req.body.urlAudio,
        definicion: req.body.definicion,
        verbo: req.body.verbo,
        color: req.body.color

    });
    await imagen.save();
    res.json({
        'status': 'Imagen guardada'
    });
};

imagenCtrl.getImagen = async (req, res) => {
    const imagen = await Imagen.findById(req.params.id)
    res.json(imagen);
};

imagenCtrl.getImagenByCat = async (req, res) => {
    const imagen = await Imagen.find().where('categoria').equals(req.params.categoria)
    res.json(imagen);
};

imagenCtrl.getImagenBySubCat = async (req, res) => {
    const imagen = await Imagen.find().where('subcategoria').equals(req.params.subcategoria)
    res.json(imagen);
};



 imagenCtrl.getImagenByVer = async (req, res) => {
    const imagen = await Imagen.find().where('verbo').equals(req.params.verbo)
    res.json(imagen);
};



imagenCtrl.editImagen = async (req, res) => {
    const { id } = req.params;
    const imagen = {
        nombre: req.body.nombre,
        silabas: req.body.silabas,
        categoria: req.body.categoria,
        subcategoria: req.body.subcategoria,
        fonema: req.body.fonema,
        difono: req.body.difono,
        urlImg: req.body.urlImg,
        urlAudio: req.body.urlAudio,
        definicion: req.body.definicion,
        verbo: req.body.verbo,
        color: req.body.color
    };
    await Imagen.findByIdAndUpdate(id, { $set: imagen }, { new: true });
    res.json({ status: 'Imagen actualizada' });
};

imagenCtrl.deleteImagen = async (req, res) => {
    await Imagen.findByIdAndRemove(req.params.id);
    res.json({ status: 'Imagen eliminada' });

};

module.exports = imagenCtrl;