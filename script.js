
let tasks = [];
let currentFilter = "all";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const errorMessage = document.getElementById("errorMessage");
const emptyMessage = document.getElementById("emptyMessage");
const clearCompletedButton = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");


taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = taskInput.value.trim();

  
    if (taskName === "") {
        errorMessage.textContent = "Please enter a task before adding it.";
        taskInput.focus();
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";
    errorMessage.textContent = "";

    displayTasks();
});


function displayTasks() {
    taskList.innerHTML = "";

    let visibleTasks = [];

    for (let i = 0; i < tasks.length; i++) {
        if (currentFilter === "all") {
            visibleTasks.push(tasks[i]);
        } else if (
            currentFilter === "active" &&
            tasks[i].completed === false
        ) {
            visibleTasks.push(tasks[i]);
        } else if (
            currentFilter === "completed" &&
            tasks[i].completed === true
        ) {
            visibleTasks.push(tasks[i]);
        }
    }

    for (let i = 0; i < visibleTasks.length; i++) {
        const task = visibleTasks[i];

        const listItem = document.createElement("li");
        listItem.className = "list-group-item task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input task-check";
        checkbox.checked = task.completed;
        checkbox.setAttribute(
            "aria-label",
            "Mark task as completed"
        );

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            displayTasks();
        });

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.name;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className =
            "btn btn-outline-danger btn-sm delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            displayTasks();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    }

    let activeCount = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === false) {
            activeCount++;
        }
    }

    if (activeCount === 1) {
        taskCounter.textContent = "1 remaining";
    } else {
        taskCounter.textContent = activeCount + " remaining";
    }

    if (visibleTasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
        currentFilter = this.getAttribute("data-filter");

        for (let j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove("active");
        }

        this.classList.add("active");

        displayTasks();
    });
}

clearCompletedButton.addEventListener("click", function () {
    tasks = tasks.filter(function (task) {
        return task.completed === false;
    });

    displayTasks();
});

displayTasks();
