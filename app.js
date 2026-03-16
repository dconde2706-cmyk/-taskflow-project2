const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const search = document.getElementById("search-input");
const themeToggle = document.getElementById("theme-toggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", () => {
  tasks.forEach(task => createTask(task));
});


form.addEventListener("submit", function(e){
  e.preventDefault();

  const text = input.value.trim();

  if(text === "") return;

  tasks.push(text);
  saveTasks();
  createTask(text);

  input.value = "";
});


function createTask(task){

  const li = document.createElement("li");

  li.className =
    "flex justify-between items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded";

  li.textContent = task;

  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  deleteBtn.className =
    "bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition";

  deleteBtn.addEventListener("click", () => {
    li.remove();
    tasks = tasks.filter(t => t !== task);
    saveTasks();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
}

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

search.addEventListener("input", function(){

  const text = search.value.toLowerCase();
  const items = list.querySelectorAll("li");

  items.forEach(item => {

    const taskText = item.firstChild.textContent.toLowerCase();

    if(taskText.includes(text)){
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }

  });

});

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
