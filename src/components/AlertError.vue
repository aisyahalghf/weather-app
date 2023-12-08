<template>
  <div class="p-[20px] bg-red-500 text-white font-bold">
    <span
      class="text-white font-extrabold float-right text-xl leading-[20px] cursor-pointer hover:text-black"
      onclick="this.parentElement.style.display='none';"
      >&times;</span
    >
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "AlertError",
  props: {
    msg: String,
  },
};
</script>
