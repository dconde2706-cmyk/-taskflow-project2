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

const actualizarEstado = (id) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    throw new Error('NOT_FOUND');
  }
  tasks[index].completado = !tasks[index].completado;
  return tasks[index];
};

const eliminarTarea = (id) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    throw new Error('NOT_FOUND');
  }
  tasks.splice(index, 1);
};



const completarTodas = () => {
  console.log("--- Log: Ejecutando completarTodas ---");
  tasks.forEach(t => t.completado = true);
  return tasks;
};

const eliminarCompletadas = () => {
  console.log("--- Log: Ejecutando eliminarCompletadas ---");
  tasks = tasks.filter(t => !t.completado);
  return tasks;
};


module.exports = {
  obtenerTodas,
  crearTarea,
  actualizarEstado,
  eliminarTarea,
  completarTodas,
  eliminarCompletadas
};
