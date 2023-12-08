/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: true,
  theme: {
    extend: {
      backgroundImage: {
        cloudy: "url('https://wallpaperaccess.com/full/1806518.jpg')",
        mist: "url('https://images.unsplash.com/photo-1520916784675-1b97f1fc1c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8&w=1000&q=80')",
        rain: "url('https://wallpapers.com/images/hd/rain-background-0b8x5ij96j9q1iiw.jpg')",
        storm:
          "url('https://images.unsplash.com/photo-1594760467013-64ac2b80b7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDE5fHx8ZW58MHx8fHx8&w=1000&q=80')",
        snow: "url('https://media.istockphoto.com/id/1354145956/video/view-of-snowflakes-falling-in-a-very-windy-storm.jpg?s=640x640&k=20&c=Y7klFjLDQ-dtsQtuQemrTkYpczxxWosiNtoPuaDL_Bc=')",
        clear:
          "url('https://media.istockphoto.com/id/1328689113/photo/summer-blue-sky-and-white-cloud-white-background-beautiful-clear-cloudy-in-sunlight-calm.jpg?s=612x612&w=0&k=20&c=37qEuwdxyQSx9kuS-_Gz0WiKFX6jMXZN9aRY47mN2vI=')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
