//SELECTORS

let todoInput = document.querySelector("#to-do-input");
let todoButton = document.querySelector("#to-do-button");
let todoList = document.querySelector("#to-do-list");
let todoContainer = document.querySelector("#to-do-container");
let filterOption = document.querySelector("#filter-to-do");
let clearDiv = document.querySelector("#clear-div");

//events listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteItem);
filterOption.addEventListener("click", filterItems);
document.addEventListener("DOMContentLoaded", getTodoItems);

//functions

//basic To-do Items addition
function addTodo(event) {
  event.preventDefault();
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  let newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  saveLocalTodoItems({ description: todoInput.value, status: "Open" });
  let completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  let trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  todoList.prepend(todoDiv);
  todoInput.value = "";
  let todoItems = JSON.parse(localStorage.getItem(`todoItems`));
  if (Array.isArray(todoItems) && todoItems.length === 2) {
    createClearAll();
  }
}

//creating clear all button
function createClearAll() {
  let clearBtn = document.createElement("button");
  clearBtn.innerHTML = `Clear all`;
  clearBtn.classList.add("clear-btn");
  clearDiv.appendChild(clearBtn);
  clearBtn.addEventListener("click", clearList);
}

//removing Clear All button
function removeClearAll() {
  let clearBtn = document.querySelector(".clear-btn");
  clearBtn.classList.add("animationClear");
  clearBtn.addEventListener("transitionend", (event) => {
    clearBtn.remove();
  });
}

//deleting items or marking as completed
function deleteItem(event) {
  let item = event.target;
  if (item.classList[0] === "trash-btn") {
    let toDoItem = item.parentElement;
    toDoItem.classList.add("animation");
    removeLocalTodoItems(toDoItem);
    toDoItem.addEventListener("transitionend", (event) => {
      toDoItem.remove();
      let todoItems = JSON.parse(localStorage.getItem(`todoItems`));
      let clearBtn = document.querySelector(".clear-btn");
      let completedTodosArray = todoItems.filter((todo) => {
        return todo.status === "Completed";
      });
      let uncompletedTodosArray = todoItems.filter((todo) => {
        return todo.status === "Open";
      });
      if (
        Array.isArray(todoItems) &&
        todoItems.length === 1 &&
        clearBtn !== null
      ) {
        removeClearAll();
      } else if (
        Array.isArray(completedTodosArray) &&
        completedTodosArray.length === 0
      ) {
        showCaseAll();
      } else if (
        Array.isArray(uncompletedTodosArray) &&
        uncompletedTodosArray.length === 0
      ) {
        showCaseAll();
      }
    });
  }
  if (item.classList[0] === "complete-btn") {
    let toDoItem = item.parentElement;
    removeLocalTodoItems(toDoItem);
    saveLocalTodoItems({
      description: toDoItem.children[0].innerHTML,
      status: "Completed",
    });
    toDoItem.classList.add("completed");
  }
}

// Show the case of all Todo's after clearing all items in other filters
function showCaseAll() {
  let todosArray = JSON.parse(localStorage.getItem(`todoItems`));
  todoList.childNodes.forEach(function (todoItem, i, self) {
    todoItem.style.display = "flex";
    document.getElementById("filter-to-do").value = "all";
    if (Array.isArray(todosArray) && todosArray.length > 1) {
      createClearAllInFilter(todosArray, i, self);
    }
  });
}

//filtering to do list

function removeClearAllInFilter(array) {
  let clearBtn = document.querySelector(".clear-btn");
  if (Array.isArray(array) && array.length <= 1 && clearBtn !== null) {
    removeClearAll();
  }
}

function createClearAllInFilter(array, i, self) {
  let clearBtn = document.querySelector(".clear-btn");
  if (
    Array.isArray(array) &&
    array.length > 1 &&
    clearBtn === null &&
    self.length == i + 2
  ) {
    createClearAll();
  }
}

function filterItems(event) {
  let todosArray = JSON.parse(localStorage.getItem(`todoItems`));
  let todoItems = todoList.childNodes;
  todoItems.forEach(function (todoItem, i, self) {
    switch (event.target.value) {
      case "all":
        todoItem.style.display = "flex";
        createClearAllInFilter(todosArray, i, self);
        break;
      case "completed":
        let completedTodosArray = todosArray.filter((todo) => {
          return todo.status === "Completed";
        });
        if (todoItem.classList.contains("completed")) {
          todoItem.style.display = "flex";
          removeClearAllInFilter(completedTodosArray);
          createClearAllInFilter(completedTodosArray, i, self);
        } else {
          todoItem.style.display = "none";
        }
        break;
      case "uncompleted":
        let uncompletedTodosArray = todosArray.filter((todo) => {
          return todo.status === "Open";
        });
        if (!todoItem.classList.contains("completed")) {
          todoItem.style.display = "flex";
          removeClearAllInFilter(uncompletedTodosArray);
          createClearAllInFilter(uncompletedTodosArray, i, self);
        } else {
          todoItem.style.display = "none";
        }
    }
  });
}

//clear function after clicking Clear All button

function clearList() {
  let todoItems = todoList.childNodes;
  todoItems.forEach(function (todoItem) {
    if (todoItem.style.display == "flex" || todoItem.style.display == "") {
      todoItem.classList.add("animation");
      removeLocalTodoItems(todoItem);
      todoItem.addEventListener("transitionend", (event) => {
        todoItem.remove();
        if (todoItems.length <= 1) {
          removeClearAll();
        }
        showCaseAll();
      });
    }
  });
}

//from local Storage
//check for existing items and pusing array

function saveLocalTodoItems(todoItem) {
  let todoItems;
  if (localStorage.getItem(`todoItems`) === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem(`todoItems`));
  }
  todoItems.unshift(todoItem);
  localStorage.setItem(`todoItems`, JSON.stringify(todoItems));
}

//display items from local storage after browser refresh

function getTodoItems() {
  let todoItems;
  if (localStorage.getItem(`todoItems`) === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem(`todoItems`));
  }
  todoItems
    .sort((a, b) => (a.status > b.status ? -1 : 1))
    .forEach(function (todoItem, i, self) {
      let todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      let newTodo = document.createElement("li");
      newTodo.innerHTML = todoItem.description;
      newTodo.classList.add("todo-item");
      if (todoItem.status == "Completed") {
        todoDiv.classList.add("completed");
      }
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
      if (self.length == i + 2) {
        createClearAll();
      }
    });
}

//removing deleted to do items from local storage

function removeLocalTodoItems(todoItem) {
  let todoItems;
  if (localStorage.getItem(`todoItems`) === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem(`todoItems`));
  }
  let todoItemsIndex = todoItem.children[0].innerText;
  todoItems.splice(
    todoItems.map((x) => x.description).indexOf(todoItemsIndex),
    1
  );
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}
