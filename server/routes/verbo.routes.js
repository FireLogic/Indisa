const express = require('express');
const router = express.Router();

const verboCtrl = require('../controllers/verbo.controller');

router.get('/', verboCtrl.getVerbos);
router.post('/', verboCtrl.createVerbo);
router.get('/:id', verboCtrl.getVerbo);
router.put('/:id', verboCtrl.editVerbo);
router.delete('/:id', verboCtrl.deleteVerbo);

module.exports = router; 