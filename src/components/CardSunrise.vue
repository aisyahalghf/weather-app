<template>
  <div class="bg-sky-600 rounded-lg w-[250px] p-5">
    <div class="flex items-center gap-2">
      <Icon icon="meteocons:sunrise" />
      <h1 class="text-lg text-left">SUNRISE</h1>
    </div>
    <p class="border-b text-left mt-2 pb-5 text-5xl">{{ sunrise }}</p>
    <h1 class="mt-5 text-lg text-left">Sunset : {{ sunset }}</h1>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "CardSunrise",
  components: {
    Icon,
  },
  props: {
    sunrise: String,
    sunset: String,
  },
};
</script>
