let tasksData = [
  {
    id: 1,
    name: "Ver se eu tô na esquina",
    toDo: true,
  },
  {
    id: 2,
    name: "Dar banho nos gatos",
    toDo: false,
  },
];

const addTaskInput = document.getElementById("task_input");
const addTaskButton = document.getElementsByTagName("button")[0];
const taskList = document.getElementById("tasks_list");

// Add new task
function addTask(event) {
  event.preventDefault();
  console.log("Task adicionada");
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
