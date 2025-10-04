var input = document.getElementById("newTask");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var leftCount = document.getElementById("leftCount");
var clearCompleted = document.getElementById("clearCompleted");
var filters = document.querySelectorAll(".filter");
var emptyMsg = document.getElementById("emptyMsg");

var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
var filter = "all";


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function render() {
  taskList.innerHTML = "";
  var visibleTasks = tasks.filter(t =>
    filter === "active" ? !t.completed :
    filter === "completed" ? t.completed : true
  );

  if (visibleTasks.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  visibleTasks.forEach((task, index) => {
    var li = document.createElement("li");
    li.className = `item ${task.completed ? "completed" : ""}`;

    var check = document.createElement("div");
    check.className = "check";
    check.innerHTML = task.completed ? "✔" : "";
    check.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      render();
    };

    var title = document.createElement("span");
    title.className = "title";
    title.textContent = task.text;

    var actions = document.createElement("div");
    actions.className = "actions";

    var delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      render();
    };

    actions.appendChild(delBtn);
    li.appendChild(check);
    li.appendChild(title);
    li.appendChild(actions);
    taskList.appendChild(li);
  });

  leftCount.textContent = tasks.filter(t => !t.completed).length;
}


function addTask() {
  var text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    input.value = "";
    render();
  }
}


filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  });
});


clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  render();
});


addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", e => { if (e.key === "Enter") addTask(); });


render();

