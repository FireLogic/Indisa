const express = require('express');
const router = express.Router();

const pacienteCtrl = require('../controllers/paciente.controller');

router.get('/', pacienteCtrl.getPacientes);
router.post('/', pacienteCtrl.createPaciente);
router.get('/:id', pacienteCtrl.getPaciente);
router.put('/:id', pacienteCtrl.editPaciente);
router.delete('/:id', pacienteCtrl.deletePaciente);

module.exports = router;