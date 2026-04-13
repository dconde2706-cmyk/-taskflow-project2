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

const API_URL = "http://localhost:3000/api/v1/tasks";


document.addEventListener("DOMContentLoaded", loadTasks);


async function loadTasks() {
  try {
    list.innerHTML = "<p>Cargando...</p>";

    const res = await fetch(API_URL);
    const data = await res.json();

    tasks = data;
    renderTasks();
  } catch (error) {
    list.innerHTML = "<p>Error al cargar tareas</p>";
  }
}


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo: text,
        prioridad: 1
      })
    });

    input.value = "";
    loadTasks();
  } catch (error) {
    alert("Error al crear tarea");
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

  filtered.forEach(task => {
    list.appendChild(createTaskElement(task));
  });

  updateStats();
}


function createTaskElement(task) {
  const li = document.createElement("li");

  li.className =
    "flex justify-between items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded";

  const span = document.createElement("span");
  span.textContent = task.titulo;

  if (task.completado) {
    span.classList.add("line-through", "opacity-60");
  }

  const actions = document.createElement("div");
  actions.className = "flex gap-2";

  // ❌ Toggle desactivado (no hay PATCH aún)
  const info = document.createElement("span");
  info.textContent = "•";
  info.className = "px-2";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className =
    "bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded";

  deleteBtn.addEventListener("click", () => {
    eliminarTarea(task.id);
  });

  actions.appendChild(info);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  return li;
}


async function eliminarTarea(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    loadTasks();
  } catch (error) {
    alert("Error al eliminar tarea");
  }
}


document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
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
