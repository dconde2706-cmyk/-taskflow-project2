Flujo de trabajo con Cursor

Este documento describe la experiencia utilizando Cursor como IDE asistido por inteligencia artificial durante el desarrollo del proyecto TaskFlow.

Se documenta:
- Exploración de la interfaz
- Uso del autocompletado
- Uso del chat contextual
- Edición inline de código
- Uso de Composer para modificar múltiples archivos
- Atajos de teclado utilizados
- Ejemplos concretos de mejoras generadas por IA

Exploración de la interfaz

Cursor presenta una interfaz similar a Visual Studio Code. Los principales componentes son:

- Explorador de archivos para navegar por el proyecto
- Editor de código para modificar archivos
- Terminal integrada para ejecutar comandos
- Panel de chat con IA para hacer preguntas sobre el código

Esta interfaz permite combinar desarrollo tradicional con asistencia de inteligencia artificial.


Ejemplo Autocompletado con IA

Cursor genera el código automáticamente a partir de comentarios.

Por ejemplo, al escribir:

// function that filters completed tasks

Cursor sugiere automáticamente una implementación:

function getCompletedTasks(tasks) {
  return tasks.filter(task => task.completed === true);
}

Esto permite escribir funciones más rápido y reduce el trabajo repetitivo.


Ejemplo de cursor para mejorar la legibilidad de la funcion de busqueda de tareas.

Cursor suguirio esta implementacion:

search.addEventListener("input", function handleSearchInput() {
  const searchTerm = search.value.toLowerCase();
  const items = document.querySelectorAll("#task-list li");

  items.forEach(item => {
    const taskText = item.firstChild.textContent.toLowerCase();
    const matchesSearch = taskText.includes(searchTerm);

    item.style.display = matchesSearch ? "block" : "none";
  });
});


Atajos de teclado utilizados

Ctrl + K  
Permite abrir la edición inline con IA para refactorizar o modificar código seleccionado.

Ctrl + L  
Abre el chat con el agente de IA.

Ctrl + P  
Permite buscar archivos rápidamente dentro del proyecto.



Instalacion MCP

Para conectar herramientas externas con la IA se utilizó Model Context Protocol (MCP).

Se configuró un servidor MCP de tipo filesystem que permite a la IA acceder a los archivos del proyecto.

Configuración utilizada:

{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "./"
      ]
    }
  }
}


Para qué sirve MCP en proyectos reales

MCP permite integrar herramientas externas con asistentes de inteligencia artificial.

En proyectos reales puede utilizarse para:

- Acceder a repositorios de código
- Consultar bases de datos
- Buscar información en internet
- Analizar archivos grandes
- Automatizar tareas de desarrollo

Esto permite que la IA tenga más contexto y pueda ofrecer respuestas más precisas.
