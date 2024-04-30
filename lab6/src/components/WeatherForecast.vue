<template>
  <div class="weather-forecast">
    <h2>5 days forecast</h2>
    <div v-if="isLoading">
      <img src="../assets/loading-gif.gif" alt="loading" style="width:48px;height:48px;">
    </div>
    <div v-else>
      <div v-for="(day, index) in forecast" :key="index" class="weather-day">
        <div class="weather-date-time">
          <p>{{ day.time }}</p>
        </div>
        <img :src="day.img" :alt="day.desc" class="weather-icon" />
        <div class="weather-info">
          <p class="weather-desc">{{ day.desc }}</p>
          <p class="weather-temp">{{ day.min }}°C / {{ day.max }}°C</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forecast: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style scoped>
.weather-forecast {
  background-color: #838bff;
  padding: 20px;
}

.weather-day {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.weather-date-time {
  margin-right: 10px;
}

.weather-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.weather-info {
  display: flex;
  flex-direction: column;
}

.weather-desc {
  margin: 0;
}

.weather-temp {
  margin: 0;
}
</style>