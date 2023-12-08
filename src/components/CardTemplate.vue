<template>
  <div class="bg-sky-600 rounded-lg w-[250px] p-5">
    <div class="flex items-center gap-2">
      <Icon :icon="iconName" class="text-[20px]" />
      <h1 class="text-lg text-left">{{ heading }}</h1>
    </div>
    <div class="flex items-center gap-2">
      <p class="text-left mt-2 pb-5 text-5xl">{{ temp }}</p>
      <p v-if="heading === `WIND`" class="text-lg">km/hours</p>
    </div>
    <h1 class="mt-5 text-lg text-left">{{ description }}</h1>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "CardTemplate",
  components: {
    Icon,
  },
  props: {
    iconName: String,
    heading: String,
    temp: String,
    description: String,
  },
};
</script>
