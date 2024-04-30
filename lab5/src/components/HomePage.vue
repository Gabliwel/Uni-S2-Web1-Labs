<template>
  <div>
    <h1>Task Manager</h1>
    <CreateTask :addTaskArray="addTask" />
    <br>
    <br>
    <TasksList :tasks="tasks" :updateTaskArray="updateTask" :deleteTaskArray="deleteTask" />
  </div>
</template>

<script>
import CreateTask from '@/components/CreateTask.vue'
import TasksList from '@/components/TasksList.vue'
import { getTasks } from '@/services/task.js'

export default {
  name: 'HomePage',
  components: {
    CreateTask,
    TasksList
  },
  data() {
    return {
      tasks: []
    }
  },
  async created() {
    this.tasks = await getTasks()
  },
  methods: {
    async addTask(newTask) {
      this.tasks.push(newTask)
    },
    async updateTask(id, name) {
      const arrayId = this.tasks.findIndex(task => task.id === id)
      if(arrayId != -1) this.tasks[arrayId].name = name
    },
    async deleteTask(id) {
      const arrayId = this.tasks.findIndex(task => task.id === id)
      if (arrayId !== -1) this.tasks.splice(arrayId, 1)
    }
  }
};
</script>
