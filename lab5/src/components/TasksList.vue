<template>
  <div>
    <h3>Current Tasks</h3>
    <div v-if="tasks.length === 0">No tasks available.</div>
    <div v-else>
      <div v-for="task in tasks" :key="task.id" class="task">
        <div class="task-name">{{ task.name }}</div>
        <div class="button-container">
          <button @click="updateTaskClick(task)">Update</button>
          <button @click="deleteTaskClick(task)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { putTask, deleteTask } from '@/services/task.js'
export default {
  name: "TasksList",
  props: {
    tasks: {
      type: Array,
      required: true
    },
    updateTaskArray: {
      type: Function,
      required: true
    },
    deleteTaskArray: {
      type: Function,
      required: true
    }
  }, 
  methods: {
    async updateTaskClick(task) {
      const newName = prompt("Enter new name:", task.name)
      if(newName == task.name) {
        alert("The task name wasn't changed.")
      } else {
        if (newName !== null && newName.trim().length > 0) {
          await putTask(task.id, newName)
          this.updateTaskArray(task.id, newName)
        } else {
          alert("The task name can't be empty or blank.")
        }
      }
    },
    async deleteTaskClick(task) {
      const confirmDelete = confirm('Are you sure you want to delete the "' + task.name + '" task?')
      if (confirmDelete) {
        await deleteTask(task.id)
        this.deleteTaskArray(task.id)
      }
    }
  }
}
</script>

<style>
    .task {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task-name {
    flex-grow: 1;
    word-wrap: break-word;
}

.button-container {
    display: flex;
}

.button-container button {
    margin-left: 5px;
    cursor: pointer;
}
</style>
