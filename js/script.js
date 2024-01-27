// Define UI Elements
let form = document.querySelector('#task_form');
let tasklist = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// Define Event Listeners
form.addEventListener('submit', addTask);
tasklist.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks); // Corrected function name to match the event listener

// Define Functions

// Add Task
function addTask(e) {
    e.preventDefault();
    if (taskInput.value.trim() === '') { // Trimmed the task input value
        alert('Add a task !');
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value.trim() + " ")); // Trimmed the task input value
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);
        tasklist.appendChild(li);

        storeTaskInLocalStorage(taskInput.value.trim()); // Trimmed the task input value
        taskInput.value = '';
    }
}

// Remove Task
function removeTask(e) {
    if (e.target.tagName === 'A') { // Check if the clicked element is an 'a' tag
        e.preventDefault();
        if (confirm('Are you sure?')) {
            let li = e.target.parentElement;
            li.remove();

            removeTaskFromLocalStorage(li);
        }
    }
}

// Clear Tasks
function clearTask() {
    // tasklist.innerHTML = '';

    // Better approach to remove all child nodes
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }

    // Clear tasks from localStorage
    localStorage.clear();
}

// Filter Tasks
function filterTask(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent.trim().toLowerCase();
        if (item.indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Store Task in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get Tasks from Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);
        tasklist.appendChild(li);
    });
}
