const express = require('express');
const router = express.Router();

const actividadCtrl = require('../controllers/actividad.controller');

router.get('/', actividadCtrl.getActividades);
router.post('/', actividadCtrl.createActividad);
router.get('/:id', actividadCtrl.getActividad);
router.put('/:id', actividadCtrl.editActividad);
router.delete('/:id', actividadCtrl.deleteActividad);

module.exports = router;