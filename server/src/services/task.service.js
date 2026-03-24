let tasks = [];
let currentId = 1;

const obtenerTodas = () => {
  return tasks;
};

const crearTarea = ({ titulo, prioridad }) => {
  const nueva = {
    id: currentId++,
    titulo,
    prioridad,
    completado: false
  };

  tasks.push(nueva);
  return nueva;
};

const eliminarTarea = (id) => {
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    throw new Error('NOT_FOUND');
  }

  tasks.splice(index, 1);
};

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea
};
