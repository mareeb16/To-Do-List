console.log("JavaScript Connected")

var tasks = [];
var taskList = document.getElementById("taskList");
var input = document.getElementById("newTask");
var addBtn = document.getElementById("addBtn");

function showTasks() {
  taskList.innerHTML = ""; 

  tasks.forEach((task, index) => {
    var li = document.createElement("li");
    li.textContent = task; 


    var doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.onclick = () => {
      li.style.textDecoration = "line-through";
    };

    
    var editBtn = document.createElement("button");
    editBtn.textContent = "✏";
    editBtn.onclick = () => {
      let newText = prompt("Edit task:", task);
      if (newText) {
        tasks[index] = newText;
        showTasks();
      }
    };

    
    var delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      showTasks();
    };

    li.appendChild(doneBtn);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

function addTask() {
  if (input.value.trim() !== "") {
    tasks.push(input.value.trim());
    input.value = "";
    showTasks();
  }
}

addBtn.onclick = addTask;
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

showTasks();
