document.querySelector('#task').addEventListener('keypress', function(element) {if (element.key == 'Enter') {element.preventDefault(); newTask()}});

function done(label) {
    if (label.innerHTML.includes('<s>')) {
        label.innerHTML = label.textContent;
    } else {
        label.innerHTML = '<s>' + label.innerHTML + '</s>';
    }
}

function newTask() {
    const task = document.querySelector('#task');
    if (task.value == '') {
        return;
    }
    const ul = document.querySelector('#tasks');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.onchange = function() {done(label)};
    const label = document.createElement('label');
    label.textContent = task.value.trim();
    task.value = '';
    const li = document.createElement('li');
    li.className = 'list-group-item';
    input.style.marginRight = '10px';
    li.appendChild(input);
    li.appendChild(label);
    ul.appendChild(li);
}