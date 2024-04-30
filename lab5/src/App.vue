<template>
  <main>
    <HomePage/>
  </main>
</template>

<script>
import "@/assets/global.css"
import HomePage from "@/components/HomePage.vue"
export default {
  name: "app",
  components: {
    "HomePage": HomePage,
  },
}
</script>

<style>
</style>
