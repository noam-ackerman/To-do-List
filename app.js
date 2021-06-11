//SELECTORS

let todoInput = document.querySelector(".todo-input");
let todoButton = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");
let filterOption = document.querySelector(".filter-todo");

//events listeners

//document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteItem);
filterOption.addEventListener("click", filterItems);

//functions

function addTodo(event) {
  event.preventDefault();
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  let newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
  //Create Completed Button
  let completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Create trash button
  let trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //attach final Todo
  todoList.appendChild(todoDiv);
}

function deleteItem(event) {
  let item = event.target;

  if (item.classList[0] === "trash-btn") {
    let toDoItem = item.parentElement;
    toDoItem.classList.add("animation");
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
  let todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = `flex`;
        break;
      case "completed":
        if (todo.classlist.contains(`completed`)) {
          todo.style.display = `flex`;
        } else {
          todo.style.display = `none`;
        }
        break;
      case "uncompleted":
        if (todo.classlist.contains(`uncompleted`)) {
          todo.style.display = `flex`;
        } else {
          todo.style.display = `none`;
        }
        break;
    }
  });
}
