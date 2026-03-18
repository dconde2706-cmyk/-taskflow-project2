const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const search = document.getElementById("search-input");
const themeToggle = document.getElementById("theme-toggle");

const totalEl = document.getElementById("total");
const completedEl = document.getElementById("completed");
const pendingEl = document.getElementById("pending");

const completeAllBtn = document.getElementById("complete-all");
const clearCompletedBtn = document.getElementById("clear-completed");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let searchText = "";


document.addEventListener("DOMContentLoaded", renderTasks);


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const newTask = {
    id: Date.now(),
    title: text,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  input.value = "";
});

function renderTasks() {
  list.innerHTML = "";

  let filtered = tasks;


  if (currentFilter === "completed") {
    filtered = filtered.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    filtered = filtered.filter(t => !t.completed);
  }

  if (searchText) {
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(searchText)
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
  span.textContent = task.title;

  if (task.completed) {
    span.classList.add("line-through", "opacity-60");
  }

  const actions = document.createElement("div");
  actions.className = "flex gap-2";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.className = "bg-green-500 px-2 rounded text-white";

  completeBtn.addEventListener("click", () => {
    toggleTask(task.id);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className =
    "bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded";

  deleteBtn.addEventListener("click", () => {
    deleteTask(task.id);
  });

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  return li;
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

completeAllBtn.addEventListener("click", () => {
  tasks = tasks.map(task => ({ ...task, completed: true }));
  saveTasks();
  renderTasks();
});

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
});

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
  const completed = tasks.filter(t => t.completed).length;

  totalEl.textContent = total;
  completedEl.textContent = completed;
  pendingEl.textContent = total - completed;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
});

if (localStorage.getItem("darkMode") === "true") {
  document.documentElement.classList.add("dark");
}
