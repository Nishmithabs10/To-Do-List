// app.js

document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('.Todo-input');
    const todoButton = document.querySelector('.todo-button');
    const todoList = document.querySelector('.to-do-list');

    todoButton.addEventListener('click', addTodo);
    todoList.addEventListener('click', deleteOrComplete);

    // Load tasks from localStorage when the DOM is loaded
    loadTasks();

    function addTodo(event) {
        event.preventDefault();

        if (todoInput.value.trim() === "") return;

        // Create Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Right Mark Button (Complete Button)
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        // Trash Button (Delete Button)
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        // Append to List
        todoList.appendChild(todoDiv);

        // Save to localStorage
        saveLocalTasks(todoInput.value);

        // Clear Todo Input Value
        todoInput.value = '';
    }

    function deleteOrComplete(event) {
        const item = event.target;

        // Delete Todo
        if (item.classList.contains('trash-btn')) {
            const todo = item.parentElement;
            todo.classList.add('fall');
            todo.addEventListener('transitionend', () => {
                todo.remove();
                // Remove from localStorage
                removeLocalTask(todo);
            });
        }

        // Mark as Complete or Incomplete
        if (item.classList.contains('complete-btn')) {
            const todo = item.parentElement;
            todo.classList.toggle('completed');
            // Update localStorage
            updateLocalTasks(todo);
        }
    }

    function saveLocalTasks(todo) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push({ text: todo, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTasks() {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        
        // Clear existing list
        todoList.innerHTML = '';

        // Render tasks
        todos.forEach(todo => {
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');

            const newTodo = document.createElement('li');
            newTodo.innerText = todo.text;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);

            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add('complete-btn');
            todoDiv.appendChild(completedButton);

            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add('trash-btn');
            todoDiv.appendChild(trashButton);

            // Check if task is completed
            if (todo.completed) {
                todoDiv.classList.add('completed');
            }

            todoList.appendChild(todoDiv);
        });
    }

    function removeLocalTask(todo) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.findIndex(item => item.text === todoIndex), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateLocalTasks(todo) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        const todoIndex = todo.children[0].innerText;
        const todoItem = todos.find(item => item.text === todoIndex);
        todoItem.completed = !todoItem.completed;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
