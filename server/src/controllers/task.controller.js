const taskService = require('../services/task.service');

const obtenerTodas = (req, res) => {
  const tareas = taskService.obtenerTodas();
  res.json(tareas);
};

const crearTarea = (req, res, next) => {
  try {
    const { titulo, prioridad } = req.body;

    if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 3) {
      return res.status(400).json({ error: 'El título debe tener al menos 3 caracteres' });
    }

    if (typeof prioridad !== 'number' || prioridad < 1) {
      return res.status(400).json({ error: 'La prioridad debe ser un número válido' });
    }

    const nueva = taskService.crearTarea({ titulo, prioridad });
    res.status(201).json(nueva);
  } catch (error) {
    next(error);
  }
};

const actualizarEstado = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const actualizada = taskService.actualizarEstado(id);
    res.json(actualizada);
  } catch (error) {
    next(error);
  }
};

const eliminarTarea = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    taskService.eliminarTarea(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
const completarTodas = (req, res) => {
  taskService.completarTodas();
  res.json({ message: 'Todas las tareas completadas' });
};

const eliminarCompletadas = (req, res) => {
  taskService.eliminarCompletadas();
  res.status(200).json({ message: 'Tareas completadas eliminadas' });
};


module.exports = {
  obtenerTodas,
  crearTarea,
  actualizarEstado,
  eliminarTarea,
  completarTodas,  
  eliminarCompletadas 
};

