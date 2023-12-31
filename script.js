const todoInput = document.getElementById("todoInput");
const addTodoButton = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");
const deleteAllButton = document.getElementById("deleteAll");
const errorMessage = document.querySelector(".error-message");
const deleteButton = document.querySelector("deleteButton");
const alertMessage = document.getElementById("alert-message"); // Define the alertMessage element

// Load todos from local storage when the page loads
window.addEventListener("load", () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todoText) => {
    createTodoItem(todoText);
  });
});

// Add button
addTodoButton.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    // Create a new todo item
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = 
           `<input type="text" class="form-control todo-item" value="${todoText}" readonly>
            <button class="btn btn-danger delete-todo">Delete</button>
            <button class="btn btn-warning edit-todo">Edit</button>`;
    todoList.appendChild(listItem);

    // Clear input field and hide error message
    todoInput.value = "";
    errorMessage.style.display = "none";

    // Add event listeners for delete and edit buttons
    const deleteButton = listItem.querySelector(".delete-todo");
    const editButton = listItem.querySelector(".edit-todo");
    const todoItemInput = listItem.querySelector(".todo-item");
    // const createTodoItem=listItem.querySelector(".createTodoItem");

    saveTodosToLocalStorage();
    showAlert("Items saved successfully!!");

    //  Delete button
    deleteButton.addEventListener("click", () => {
      listItem.remove();
      showAlert("Item deleted successfully!!")
      saveTodosToLocalStorage();
    });

    // Edit button
    editButton.addEventListener("click", () => {
      todoItemInput.removeAttribute("readonly");
      todoItemInput.focus();
      editButton.style.display = "none";
      deleteButton.style.display = "none";
      addTodoButton.style.display = "none";
      document.getElementById("addTodo").style.display = "none";
      document.getElementById("editTodo").style.display = "inline";
    });

    document.getElementById("editTodo").addEventListener("click", () => {
      todoItemInput.setAttribute("readonly", "true");
      editButton.style.display = "inline";
      deleteButton.style.display = "inline";
      addTodoButton.style.display = "inline";
      document.getElementById("addTodo").style.display = "none";
      document.getElementById("editTodo").style.display = "none";
      saveTodosToLocalStorage();
      showAlert("Items saved successfully!!");
    });
  } else {
    errorMessage.style.display = "block";
  }
});

// deleteall button
deleteAllButton.addEventListener("click", () => {
  todoList.innerHTML = "";
  showAlert("All Items are deleted successfully!");
  clearTodosFromLocalStorage();
});

// save and clear items from local storage
function saveTodosToLocalStorage() {
  const todos = Array.from(todoList.children).map((todoItem) => {
    return todoItem.querySelector(".todo-item").value;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodosFromLocalStorage() {
  localStorage.removeItem("todos");
}

// Define the showAlert function
function showAlert(message) {
  alertMessage.textContent = message;
  alertMessage.style.display = "block";

  setTimeout(() => {
    alertMessage.style.display = "none";
  }, 3000);
}
