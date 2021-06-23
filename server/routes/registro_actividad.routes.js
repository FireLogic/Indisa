const express = require('express');
const router = express.Router();

const registroActividadCtrl = require('../controllers/registro_actividad.controller');

router.get('/', registroActividadCtrl.getRegistroActividades);
router.post('/', registroActividadCtrl.createRegistroActividad);
router.get('/:paciente', registroActividadCtrl.getRegistroActividad);
router.put('/:id', registroActividadCtrl.editRegistroActividad);
router.delete('/:id', registroActividadCtrl.deleteRegistroActividad);

module.exports = router;