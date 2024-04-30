<template>
  <div class="location-header">
    <h1>LAB 6 - WEATHER.JS</h1>

    <div v-if="isLoading">
      <img src="../assets/loading-gif.gif" alt="loading" style="width:48px;height:48px;">
    </div>
    <div v-else>
      <p class="location">{{ location }}</p>
      <div class="coordinates">
        <p class="latitude">Latitude: {{ latitude }}</p>
        <p class="longitude">Longitude: {{ longitude }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: false
    },
    longitude: {
      type: Number,
      required: false
    },
    isLoading: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style scoped>
.location-header {
  background-color: #838bff;
  padding: 10px;
}

.location {
  font-size: 20px;
  margin: 0;
}

.coordinates {
  margin-top: 10px;
}

.latitude,
.longitude {
  margin: 0;
}
</style>
