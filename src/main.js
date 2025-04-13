let todos = [];
let filter = "all";

async function fetchTodos() {
  const response = await fetch("/todos");
  todos = await response.json();
}

async function createTodo(todoText) {
  await fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: todoText }),
  });
}

async function updateTodoStatus(id, done) {
  await fetch(`/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: done }),
  });
}

async function renderTodos() {
  await fetchTodos();
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
      markTodoAsDoneButton.onclick = async function () {
        await updateTodoStatus(todo.id, true);
        renderTodos();
      };
      todoItemLi.appendChild(markTodoAsDoneButton);
    } else {
      todoItemLi.style.textDecoration = "line-through";
    }
    todoListUl.appendChild(todoItemLi);
  }
}

document.getElementById("new-todo").addEventListener("keypress", async function (e) {
  if (e.key === "Enter") {
    const newTodoInput = document.getElementById("new-todo");
    const todoText = newTodoInput.value.trim();
    if (todoText === "") return;
    await createTodo(todoText);
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

renderTodos();