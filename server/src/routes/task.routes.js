const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

router.get('/', controller.obtenerTodas);
router.post('/', controller.crearTarea);
router.patch('/complete-all', controller.completarTodas); 
router.delete('/completed', controller.eliminarCompletadas); 
router.patch('/:id', controller.actualizarEstado);
router.delete('/:id', controller.eliminarTarea);

module.exports = router;
