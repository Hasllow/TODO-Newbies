function uid() {
  return Date.now().toString(16) + Math.random().toString(16).substring(2);
}

let tasksData = loadTasks();
console.log(tasksData);

const addTaskInput = document.getElementById("task_input");
const addTaskButton = document.getElementsByTagName("button")[0];
const taskList = document.getElementById("tasks_list");
const toDoCounterText = document.getElementById("todo_count");
const doneCounterText = document.getElementById("done_count");
const emptyTasks = document.getElementById("empty_tasks");

// Empty tasks
function verifyIfListIsEmpty() {
  if (tasksData.length === 0) {
    emptyTasks.classList.remove("hidden");
  } else {
    emptyTasks.classList.add("hidden");
  }
}

// Counter
function counter() {
  let toDoCounter = 0;
  let doneCounter = 0;

  toDoCounter = tasksData.length;
  toDoCounterText.innerHTML = `${toDoCounter}`;

  for (const task of tasksData) {
    if (task.toDo === false) doneCounter++;
  }

  doneCounterText.innerHTML = `${doneCounter}`;
}

counter();

// Create new task element
function createNewTaskEl(taskName, taskId, taskToDo) {
  let task = document.createElement("li");
  task.classList.add("task");
  task.classList.add(taskToDo ? "todo" : "done");
  task.setAttribute("id", taskId);

  let leftContent = document.createElement("div");
  leftContent.classList.add("left_content");

  let todoIcon = document.createElement("i");
  todoIcon.classList.add("ph-duotone");
  todoIcon.classList.add("ph-circle-dashed");
  todoIcon.classList.add("check_btn");
  todoIcon.addEventListener("click", completeTask);

  let doneIcon = document.createElement("i");
  doneIcon.classList.add("ph-duotone");
  doneIcon.classList.add("ph-check-circle");
  doneIcon.classList.add("check_btn");
  doneIcon.addEventListener("click", incompleteTask);

  let name = document.createElement("p");
  name.innerHTML = taskName;

  if (!taskToDo) {
    name.classList.add("risked");
    todoIcon.classList.add("hidden");
  } else {
    doneIcon.classList.add("hidden");
  }

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("ph-duotone");
  deleteIcon.classList.add("ph-trash");
  deleteIcon.classList.add("delete_btn");
  deleteIcon.addEventListener("click", deleteTask);

  leftContent.appendChild(todoIcon);
  leftContent.appendChild(doneIcon);
  leftContent.appendChild(name);

  task.appendChild(leftContent);
  task.appendChild(deleteIcon);

  return task;
}

// Add new task
function addTask(event) {
  event.preventDefault();

  const newTaskName = addTaskInput.value;
  const newTask = { id: uid(), name: newTaskName, toDo: true };

  tasksData.push(newTask);
  const taskElement = createNewTaskEl(newTask.name, newTask.id, newTask.toDo);
  taskList.appendChild(taskElement);
  addTaskInput.value = "";

  counter();
  verifyIfListIsEmpty();
  saveTasks();
}

// Complete task
function completeTask(event) {
  const todoIcon = event.target;
  todoIcon.classList.add("hidden");

  const text = todoIcon.parentNode.childNodes[2];
  text.classList.add("risked");

  const taskToCompleteId = todoIcon.parentNode.parentNode.id;
  const taskToComplete = document.getElementById(taskToCompleteId);

  taskToComplete.classList.add("done");
  taskToComplete.classList.remove("todo");

  const doneIcon = todoIcon.parentNode.childNodes[1];
  doneIcon.classList.remove("hidden");

  tasksData.find((task) => {
    if (task.id === taskToCompleteId) task.toDo = false;
  });

  counter();
  saveTasks();
}
// Incomplete task
function incompleteTask(event) {
  const doneIcon = event.target;
  doneIcon.classList.add("hidden");

  const text = doneIcon.parentNode.childNodes[2];
  text.classList.remove("risked");

  const taskToCompleteId = doneIcon.parentNode.parentNode.id;
  const taskToComplete = document.getElementById(taskToCompleteId);

  taskToComplete.classList.add("todo");
  taskToComplete.classList.remove("done");

  const todoIcon = doneIcon.parentNode.childNodes[0];
  todoIcon.classList.remove("hidden");

  tasksData.find((task) => {
    if (task.id === taskToCompleteId) task.toDo = true;
  });

  counter();
  saveTasks();
}
// Delete task
function deleteTask(event) {
  const taskToDeleteId = event.target.parentNode.id;
  const taskToDelete = document.getElementById(taskToDeleteId);

  const tasksWithoutDeletedOne = tasksData.filter(
    (task) => task.id !== taskToDeleteId
  );
  tasksData = tasksWithoutDeletedOne;
  taskList.removeChild(taskToDelete);

  counter();
  verifyIfListIsEmpty();
  saveTasks();
}

// Sync HTML with taskData list
for (const task of tasksData) {
  const taskItem = createNewTaskEl(task.name, task.id, task.toDo);
  taskList.appendChild(taskItem);
}

// Save info on storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

// Load storage
function loadTasks() {
  const tasks = localStorage.getItem("tasks");

  if (tasks === null) return [];

  return JSON.parse(tasks);
}
