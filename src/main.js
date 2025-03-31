const todos = [];
let filter = "all"; 

document.getElementById("new-todo").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const newTodoInput = document.getElementById("new-todo");
        const todoText = newTodoInput.value.trim();
        if (todoText === "") return;

        addTodo(todoText);
        newTodoInput.value = "";
        renderTodos();
    }
});

document.getElementById("filter-all").addEventListener("click", function () {
    filter = "all";
    renderTodos();
});

document.getElementById("filter-active").addEventListener("click", function () {
    filter = "active";
    renderTodos();
});

document.getElementById("filter-completed").addEventListener("click", function () {
    filter = "completed";
    renderTodos();
});

function renderTodos() {
    const todoListUl = document.getElementById("todo-list");

    todoListUl.innerHTML = "";

    for (const todo of todos) {
        if (filter === "active" && todo.done) continue;
        if (filter === "completed" && !todo.done) continue;

        const todoItemLi = document.createElement("li");
        todoItemLi.textContent = todo.text;

        if (!todo.done) {
            const markTodoAsDoneButton = document.createElement("button");
            markTodoAsDoneButton.textContent = "Concluir";
            markTodoAsDoneButton.onclick = function () {
                todo.done = true;
                renderTodos();
            };
            todoItemLi.appendChild(markTodoAsDoneButton);
        } else {
            todoItemLi.style.textDecoration = "line-through";
        }

        todoListUl.appendChild(todoItemLi);
    }
}

function addTodo(todoText) {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 0;

    const newTodo = {
        id: lastId + 1,
        text: todoText,
        done: false,
    };

    todos.push(newTodo);
}

function markTodoAsDone(todoId) {
    const todo = todos.find((todo) => todo.id === todoId);
    todo.done = true;
}

renderTodos();