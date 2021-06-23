const express = require('express');
const router = express.Router();

const tareaCtrl = require('../controllers/tarea.controller');

router.get('/', tareaCtrl.getTareas);
router.post('/', tareaCtrl.createTarea);
router.get('/:receptor', tareaCtrl.getTarea);
router.put('/:id', tareaCtrl.editTarea);
router.delete('/:id', tareaCtrl.deleteTarea);

module.exports = router;