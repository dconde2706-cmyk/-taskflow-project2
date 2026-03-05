const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const search = document.getElementById("search-input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const taskText = input.value.trim();

  if(taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  input.value = "";
});

function renderTasks() {

  list.innerHTML = "";

  tasks.forEach(task => {

    const li = document.createElement("li");
    li.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);

  });

}

function deleteTask(id) {

  tasks = tasks.filter(task => task.id !== id);

  saveTasks();
  renderTasks();

}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});

search.addEventListener("input", function() {

  const value = search.value.toLowerCase();

  const items = document.querySelectorAll("#task-list li");

  items.forEach(item => {

    const text = item.firstChild.textContent.toLowerCase();

    item.style.display = text.includes(value) ? "block" : "none";

  });

});