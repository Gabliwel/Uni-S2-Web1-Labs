<template>
  <div>
    <h3>New Task's Name</h3>
    <input v-model="taskName" placeholder="Task's name">
    <br>
    <br>
    <button @click="addTaskClick">Add Task</button>
  </div>
</template>

<script>
import { postTask } from '@/services/task.js'
export default {
  name: "CreateTask",
  data() {
    return {
      taskName: ''
    }
  },
  props: {
    addTaskArray: {
      type: Function,
      required: true
    }
  },
  methods: {
    async addTaskClick() {
      if (this.taskName.trim().length > 0) {
        const newTask = await postTask(this.taskName)
        this.addTaskArray(newTask)
        this.taskName = ''
      } else {
        alert("The task name can't be empty or blank.")
      }
    }
  }
}
</script>
