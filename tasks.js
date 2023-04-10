function uid() {
  return Date.toString(16) + Math.random().toString(16).substring(2);
}

let tasksData = [
  {
    id: uid(),
    name: "Ver se eu tô na esquina",
    toDo: true,
  },
  {
    id: uid(),
    name: "Dar banho nos gatos",
    toDo: false,
  },
];

const addTaskInput = document.getElementById("task_input");
const addTaskButton = document.getElementsByTagName("button")[0];
const taskList = document.getElementById("tasks_list");

// Create new task element
function createNewTaskEl(taskName, taskId) {
  let task = document.createElement("li");
  task.classList.add("task");
  task.classList.add("todo");
  task.setAttribute("id", taskId);

  let leftContent = document.createElement("div");
  leftContent.classList.add("left_content");

  let todoIcon = document.createElement("i");
  todoIcon.classList.add("ph-duotone");
  todoIcon.classList.add("ph-circle-dashed");
  todoIcon.classList.add("check_btn");
  todoIcon.addEventListener("click", completeTask());

  let doneIcon = document.createElement("i");
  doneIcon.classList.add("ph-duotone");
  doneIcon.classList.add("ph-check-circle");
  doneIcon.classList.add("check_btn");
  doneIcon.classList.add("hidden");
  doneIcon.addEventListener("click", incompleteTask());

  let name = document.createElement("p");
  name.innerHTML = taskName;

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("ph-duotone");
  deleteIcon.classList.add("ph-trash");
  deleteIcon.classList.add("delete_btn");
  deleteIcon.addEventListener("click", deleteTask());

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
  const taskElement = createNewTaskEl(newTask.name, newTask.id);
  taskList.appendChild(taskElement);
}
// Complete task
function completeTask(event) {
  console.log("Task marcada como completa");
}
// Incomplete task
function incompleteTask(event) {
  console.log("Task marcada como incompleta");
}
// Delete task
function deleteTask(event) {
  console.log("Task deletada");
}
