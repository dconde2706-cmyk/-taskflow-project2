const express = require('express');
const router = express.Router();

const controller = require('../controllers/task.controller');

router.get('/', controller.obtenerTodas);
router.post('/', controller.crearTarea);
router.delete('/:id', controller.eliminarTarea);

module.exports = router;
