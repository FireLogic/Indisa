const express = require('express');
const router = express.Router();

const imagenCtrl = require('../controllers/imagen.controller');

router.get('/', imagenCtrl.getImagenes);
router.post('/', imagenCtrl.createImagen);
router.get('/:id', imagenCtrl.getImagen)
router.put('/:id', imagenCtrl.editImagen);
router.delete('/:id', imagenCtrl.deleteImagen);

module.exports = router;