<template>
  <main>
    <LocationHeader :location="location" :latitude="latitude" :longitude="longitude" :isLoading="isLoadingLocation"/>
    <WeatherForecast :forecast="forecast" :isLoading="isLoadingForecast"/>
  </main>
</template>

<script>
import LocationHeader from "./components/LocationHeader.vue";
import WeatherForecast from "./components/WeatherForecast.vue";
import MeteoCodeInfo from "./utils/meteoCodeInfo.json"

export default {
  name: "App",
  components: {
    LocationHeader,
    WeatherForecast
  },
  data() {
    return {
      location: "",
      forecast: [],
      latitude: null,
      longitude: null,
      isLoadingLocation: true,
      isLoadingForecast: true
    }
  },
  mounted() {
    this.getUserLocation()
  },
  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.latitude = position.coords.latitude
            this.longitude = position.coords.longitude
            this.getLocationName()
            this.getWeatherForecast()
          },
          error => {
            console.error("Error getting user location:", error)
            alert("Need geolocation for the weather forecast")
          }
        )
      } else {
        console.error("Geolocation is not supported by this browser.")
        alert("Geolocation is not supported by this browser, and it is needed for the weather forecast")
      }
    },
    async getLocationName() {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${this.latitude}&lon=${this.longitude}&format=json`
        )
        const data = await response.json()
        this.location = data.display_name
        this.isLoadingLocation = false
      } catch (error) {
        console.error("Error fetching location:", error)
      }
    },
    async getWeatherForecast() {
      const nbDays = 5
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=${nbDays}`
        )
        const data = await response.json()
        for(let i = 0; i < nbDays; i++) {
          let desc
          let img
          if (MeteoCodeInfo.hasOwnProperty(data.daily.weather_code[i])) {
            desc = MeteoCodeInfo[data.daily.weather_code[i]]["day"]["description"]
            img = MeteoCodeInfo[data.daily.weather_code[i]]["day"]["image"]
          } else {
            desc = "Unknown"
            img = "https://via.placeholder.com/100"
          }
          this.forecast.push({
            code: data.daily.weather_code[i],
            desc: desc,
            img: img,
            time: data.daily.time[i],
            min: data.daily.temperature_2m_min[i],
            max: data.daily.temperature_2m_max[i]
          })
        }
        this.isLoadingForecast = false
      } catch (error) {
        console.error("Error fetching location:", error)
      }
    }
  }
}
</script>

<style scoped>

</style>
