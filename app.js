// Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Call function to load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter task event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
  
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
  
    // Appen li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e){
  // Avoid empty input
  if(taskInput.value === ''){
    alert('Add a task');
  } else{
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
  
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
  
    // Appen li to ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);
  
    // Clear input
    taskInput.value = '';
  }

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    const task = e.target.parentElement.parentElement;
    if(confirm(`Delete task '${task.textContent}'?`)){
     task.remove();

      // Call function to remove task from Local Storage
      removeTaskFromLocalStorage(task);
    }
  }
}

// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(){
  if(confirm('Clear all tasks?')){
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }

    // Clear tasks from Local Storage
    clearTasksFromLocalStorage();
  }
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else{
      task.style.display = 'none';
    }
  });
}