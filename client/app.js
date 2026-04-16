const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const search = document.getElementById("search-input");
const themeToggle = document.getElementById("theme-toggle");

const totalEl = document.getElementById("total");
const completedEl = document.getElementById("completed");
const pendingEl = document.getElementById("pending");

let tasks = [];
let currentFilter = "all";
let searchText = "";


const API_URL = "https://taskflow-project2.vercel.app/api/v1/tasks";

document.addEventListener("DOMContentLoaded", loadTasks);


async function loadTasks() {
  try {
    list.innerHTML = "<p class='text-center p-4'>Cargando tareas...</p>";
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error en el servidor");
    
    const data = await res.json();
    tasks = data;
    renderTasks();
  } catch (error) {
    list.innerHTML = "<p class='text-center text-red-500 p-4'>⚠️ Error al conectar con el servidor</p>";
  }
}


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: text,
        prioridad: 1 // Por defecto
      })
    });

    if (res.status === 201) {
      input.value = "";
      loadTasks();
    } else {
      const errorData = await res.json();
      alert("Error: " + errorData.error);
    }
  } catch (error) {
    alert("No se pudo crear la tarea. Revisa tu conexión.");
  }
});


function renderTasks() {
  list.innerHTML = "";
  let filtered = tasks;

  if (currentFilter === "completed") {
    filtered = filtered.filter(t => t.completado);
  } else if (currentFilter === "pending") {
    filtered = filtered.filter(t => !t.completado);
  }

  if (searchText) {
    filtered = filtered.filter(t =>
      t.titulo.toLowerCase().includes(searchText)
    );
  }

  if (filtered.length === 0) {
    list.innerHTML = "<p class='text-center opacity-50 p-4'>No hay tareas que mostrar</p>";
  }

  filtered.forEach(task => {
    list.appendChild(createTaskElement(task));
  });

  updateStats();
}


function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded mb-2 shadow-sm";

  const span = document.createElement("span");
  span.textContent = task.titulo;
  if (task.completado) {
    span.classList.add("line-through", "opacity-60");
  }

  const actions = document.createElement("div");
  actions.className = "flex gap-2";


  const checkBtn = document.createElement("button");
  checkBtn.textContent = task.completado ? "↩️" : "✅";
  checkBtn.className = "hover:scale-110 transition-transform";
  checkBtn.onclick = () => alternarEstado(task.id);


  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "hover:scale-110 transition-transform";
  deleteBtn.onclick = () => eliminarTarea(task.id);

  actions.appendChild(checkBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(actions);

  return li;
}


async function alternarEstado(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "PATCH" });
    if (res.ok) {
      loadTasks();
    }
  } catch (error) {
    alert("Error al actualizar la tarea");
  }
}


async function eliminarTarea(id) {
  if (!confirm("¿Seguro que quieres eliminar esta tarea?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.status === 204) {
      loadTasks();
    }
  } catch (error) {
    alert("Error al eliminar la tarea");
  }
}



document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
  
    document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("underline", "font-bold"));
    btn.classList.add("underline", "font-bold");
    renderTasks();
  });
});

search.addEventListener("input", () => {
  searchText = search.value.toLowerCase();
  renderTasks();
});

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completado).length;
  totalEl.textContent = total;
  completedEl.textContent = completed;
  pendingEl.textContent = total - completed;
}

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
});

if (localStorage.getItem("darkMode") === "true") {
  document.documentElement.classList.add("dark");
}
