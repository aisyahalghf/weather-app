<template>
  <div
    :class="{ 'bg-clear': dataWeather?.type === '-' }"
    class="bg-no-repeat bg-cover min-h-screen"
  >
    <AlertError v-if="errorMessage" :msg="errorMessage" />
    <div
      :class="{
        'bg-storm': dataWeather?.type === 'Thunderstorm',
        'bg-cloudy': dataWeather?.type === 'Clouds',
        'bg-clear': dataWeather?.type === 'Clear',
        'bg-snow': dataWeather?.type === 'Snow',
        'bg-mist': dataWeather?.type === 'Atmosphere',
        'bg-rain':
          dataWeather?.type === 'Rain' || dataWeather?.type === 'Drizzle',
      }"
      v-if="dataWeather.icon"
      class="bg-no-repeat bg-cover min-h-screen py-10 flex flex-col gap-4 text-white font-semibold text-5xl items-center"
    >
      <h1>{{ dataWeather.location }}</h1>
      <h1 class="text-7xl">{{ dataWeather.temp.toFixed() }}&#176;</h1>
      <div class="mb-5">
        <div class="flex justify-center items-center">
          <h1 class="text-4xl font-extrabold">{{ dataWeather.type }}</h1>
          <img class="w-16 h-[100%]" alt="icon" :src="dataWeather.icon" />
        </div>
        <h1 class="text-3xl capitalize">{{ dataWeather.description }}</h1>
        <div class="flex gap-5 text-2xl justify-center">
          <p>H:{{ dataWeather.maxTemp.toFixed() }}&#176;</p>
          <p>L:{{ dataWeather.minTemp.toFixed() }}&#176;</p>
        </div>
      </div>
      <div class="flex gap-10 justify-center flex-wrap mt-20">
        <CardSunrise
          :sunrise="dataWeather.sunrise"
          :sunset="dataWeather.sunset"
        />
        <CardTemplate
          heading="WIND"
          iconName="solar:wind-bold"
          :temp="dataWeather.wind.toFixed(1)"
          :description="
            dataWeather.wind.toFixed(1) < 25
              ? `You can carry out your activities safely.`
              : `Outdoor activities may be very dangerous`
          "
        />
        <CardTemplate
          heading="FEELS LIKE"
          iconName="carbon:temperature-max"
          :temp="dataWeather.feelLike.toFixed() + `&#176;`"
          :description="
            dataWeather.temp > dataWeather.feelLike
              ? `Humidity feel coller.`
              : `Humidity is making feel warmer. `
          "
        />
        <CardTemplate
          heading="HUMIDITY"
          iconName="material-symbols-light:humidity-percentage-outline"
          :temp="dataWeather.humidity"
          :description="
            dataWeather.humidity >= 30 && dataWeather.humidity <= 60
              ? `Ideal Humidity Level`
              : `Less than ideal humidity levels`
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardSunrise from "@/components/CardSunrise.vue";
import CardTemplate from "@/components/CardTemplate";
import AlertError from "@/components/AlertError";
export default {
  name: "HomeView",
  components: {
    CardSunrise,
    CardTemplate,
    AlertError,
  },

  data() {
    return {
      errorMessage: "",
      dataWeather: {},
    };
  },
  mounted() {
    this.askPermit();
  },
  methods: {
    getLocation() {
      const apiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
      fetch(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      )
        .then((response) => response.json())
        .then((data) => this.handleSuccess(data.location))
        .catch((error) => console.log(error));
    },

    async handleSuccess(position) {
      try {
        const apiKey = process.env.VUE_APP_WEATHER_API_KEY;
        const lat = position.lat;
        const long = position.lng;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        this.dataWeather = {
          location: data.name,
          type: data.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          description: data.weather[0].description,
          maxTemp: data?.main?.temp_max - 273.15,
          minTemp: data?.main?.temp_min - 273.15,
          temp: data.main.temp - 273.15,
          sunrise: this.convertTime(data.sys.sunrise),
          sunset: this.convertTime(data.sys.sunset),
          feelLike: data.main.feels_like - 273.15,
          humidity: data?.main?.humidity + "%",
          wind: data.wind.speed * 3.6,
        };
        this.background = this.backgroundImage(data.weather[0].main);
      } catch (error) {
        this.errorMessage = "Internal Server Error";
      }
      this.errorMessage = "";
    },
    convertTime(time) {
      const date = new Date(time * 1000);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    askPermit() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.getLocation,
          this.handleError
        );
      } else {
        this.errorMessage = "Geolokasi tidak didukung di perangkat ini";
      }
    },
    handleError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.errorMessage = "User denied the request for geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          this.errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          this.errorMessage = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          this.errorMessage = "An unknown error occurred.";
          break;
      }
    },
  },
};
</script>
