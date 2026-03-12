Experimentos con IA en programación

Este documento recoge varios experimentos realizados para evaluar el impacto de la inteligencia artificial en tareas de programación.

Para cada experimento se compara:
- Resolución del problema sin IA
- Resolución con IA
- Tiempo invertido
- Calidad del código
- Nivel de comprensión del problema
Experimentos aplicados al proyecto.

Tarea 1: Filtrar tareas completadas

Sin IA

Tiempo invertido: 6 minutos

Código:

function filterCompleted(tasks){
  const completedTasks = []

  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].completed === true){
      completedTasks.push(tasks[i])
    }
  }

  return completedTasks
}

Con IA

Tiempo invertido: 2 minutos

Código sugerido por IA:

function filterCompleted(tasks){
  return tasks.filter(task => task.completed)
}

Comparacion:

La versión con IA es más corta, más legible y utiliza métodos mas modernos de JavaScript.


Tarea 2: Buscar tareas por texto

Sin IA

Tiempo invertido: 6 minutos

function searchTasks(tasks, text){
  const results = []

  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].title.toLowerCase().includes(text.toLowerCase())){
      results.push(tasks[i])
    }
  }

  return results
}

Con IA

Tiempo invertido: 2 minutos

function searchTasks(tasks, text){
  return tasks.filter(task =>
    task.title.toLowerCase().includes(text.toLowerCase())
  )
}

Comparación:

El codigo esta mucho mas simplificado gracias a la IA, ya que ha utilizado el metodo filter.


Tarea 3: Ordenar tareas por fecha

Sin IA

Tiempo invertido: 8 minutos

function sortTasksByDate(tasks){
  return tasks.sort(function(a, b){
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    if(dateA > dateB){
      return 1
    }

    if(dateA < dateB){
      return -1
    }

    return 0
  })
}

Con IA

Tiempo invertido: 2 minutos

function sortTasksByDate(tasks){
  return tasks.sort((a, b) => new Date(a.date) - new Date(b.date))
}

Comparación:

La version de la IA es mas compacta, ya que utilizo la funcion flecha.

