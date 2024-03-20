import { Todos } from './class/Todos.js';

const input = document.querySelector('#task');
input.addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
        event.preventDefault();
        const task = input.value.trim();
        if (task != '') {
            todos.addTask(task).then((task) => {
                renderTask(task);
                input.value = '';
                input.focus();
            })
        }
    }
})

function done(label) {
    if (label.innerHTML.includes('<s>')) {
        label.innerHTML = label.textContent;
    } else {
        label.innerHTML = '<s>' + label.innerHTML + '</s>';
    }
}

function renderTask(task) {
    const li = document.createElement('li');
    const ul = document.querySelector('#tasks');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.className = 'list-group-item';
    checkbox.style.marginRight = '10px';
    label.textContent = task.getText();
    checkbox.onchange = function() {done(label)};
    li.appendChild(checkbox);
    li.appendChild(label);
    ul.appendChild(li);
}

const BACKEND_ROOT_URL = 'http://localhost:3001';
const todos = new Todos(BACKEND_ROOT_URL);

const list = document.querySelector('#tasks');

input.disabled = true;

const getTasks = async() => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task);
        });
        input.disabled = false;
    }).catch((error) => {
        alert(error);
    })
}

const saveTask = async(task) => {
    try {
        const json = JSON.stringify({description: task});
        const response = await fetch(BACKEND_ROOT_URL + '/new', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
        return response.json();
    } catch (error) {
        alert(error.message);
    }
}

getTasks();