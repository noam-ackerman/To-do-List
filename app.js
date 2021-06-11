//SELECTORS

let todoInput = document.querySelector("#to-do-input");
let todoButton = document.querySelector("#to-do-button");
let todoList = document.querySelector("#to-do-list");
let filterOption = document.querySelector("#filter-to-do");

//events listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteItem);
filterOption.addEventListener("click", filterItems);
document.addEventListener("DOMContentLoaded", getTodoItems);

//functions

function addTodo(event) {
  event.preventDefault();
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  let newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  saveLocalTodoItems(todoInput.value);
  let completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  let trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteItem(event) {
  let item = event.target;

  if (item.classList[0] === "trash-btn") {
    let toDoItem = item.parentElement;
    toDoItem.classList.add("animation");
    removeLocalTodoItems(toDoItem);
    toDoItem.addEventListener("transitionend", (event) => {
      toDoItem.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    let toDoItem = item.parentElement;
    toDoItem.classList.add("completed");
  }
}

function filterItems(event) {
  let todoItems = todoList.childNodes;
  todoItems.forEach(function (todoItem) {
    switch (event.target.value) {
      case "all":
        todoItem.style.display = "flex";
        break;
      case "completed":
        if (todoItem.classList.contains("completed")) {
          todoItem.style.display = "flex";
        } else {
          todoItem.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todoItem.classList.contains("completed")) {
          todoItem.style.display = "flex";
        } else {
          todoItem.style.display = "none";
        }
    }
  });
}

function saveLocalTodoItems(todoItem) {
  let todoItems;
  if (localStorage.getItem(`todoItems`) === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem(`todoItems`));
  }
  todoItems.push(todoItem);
  localStorage.setItem(`todoItems`, JSON.stringify(todoItems));
}

function getTodoItems() {
  let todoItems;
  if (localStorage.getItem(`todoItems`) === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem(`todoItems`));
  }
  todoItems.forEach(function (todoItem) {
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    let newTodo = document.createElement("li");
    newTodo.innerHTML = todoItem;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    let completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    let trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    todoInput.value = "";
  });
}

function removeLocalTodoItems(todoItem) {
  let todoItems;
  if (localStorage.getItem(`todoItems`) === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem(`todoItems`));
  }
  let todoItemsIndex = todoItem.children[0].innerText;
  todoItems.splice(todoItems.indexOf(todoItemsIndex), 1);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}
