import * as taskService from './services.js'

const nameInput = document.getElementById("todo")
const addButton = document.getElementById("btn")
const tasksContainer = document.getElementById("tasks")

let tasksList = []

// to display task
async function renderTasks() {
    tasksContainer.innerHTML = ""
    tasksList = await taskService.getTasks()

    if(tasksList.length > 0) {
        tasksList.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");

            const taskNameElement = document.createElement("div");
            taskNameElement.textContent = task.name;
            taskNameElement.classList.add("task-name");

            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("button-container");

            const updateButton = document.createElement("button");
            updateButton.textContent = "Update";

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            
            // update btn event
            updateButton.addEventListener("click", async () => {
                const newName = prompt("Enter new name:", task.name)
                if(newName == task.name) {
                    alert("The task name wasn't changed.")
                } else {
                    if (newName !== null && newName.trim().length > 0) {
                        await taskService.putTask(task.id, newName)
                        await renderTasks()
                    } else {
                        alert("The task name can't be empty or blank.")
                    }
                }
            })

            // delete btn event
            deleteButton.addEventListener("click", async () => {
                const confirmDelete = confirm('Are you sure you want to delete the "' + task.name + '" task?')
                if (confirmDelete) {
                    await taskService.deleteTask(task.id)
                    await renderTasks()
                }
            })

            buttonContainer.appendChild(updateButton);
            buttonContainer.appendChild(deleteButton);

            taskElement.appendChild(taskNameElement);
            taskElement.appendChild(buttonContainer);

            tasksContainer.appendChild(taskElement);
        })
    } else {
        const msg = document.createElement("p")
        msg.textContent = "There is no task curently"
        tasksContainer.appendChild(msg)
    }
}


// task creation
addButton.addEventListener("click", async () => {
    await createTask()
})

nameInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        await createTask()
    }
})

async function createTask() {
    const taskName = nameInput.value;
    if (taskName.trim().length > 0) {
        const newTask = await taskService.postTask(taskName)
        tasksList.push(newTask)
        await renderTasks()
        nameInput.value = ""
    } else {
        alert("The task name can't be empty or blank.")
    }
}

renderTasks()
