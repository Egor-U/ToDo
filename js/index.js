const input = document.querySelector('#task');
input.addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
        event.preventDefault();
        const task = input.value.trim();
        if (task != '') {
            renderTask(task);
            input.value = '';
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
    label.textContent = task;
    checkbox.onchange = function() {done(label)};
    li.appendChild(checkbox);
    li.appendChild(label);
    ul.appendChild(li);
}