/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        "color-1": "#3e186d",
        "color-2": "#404597",
        "color-3": "#4163b4",
        "color-4": "#426cbe",
        "color-5": "#448ddd",
        "color-6": "#37a5e7",
        "hover-color": "#08fef9",
        "hover-color-2": "#26e0f7",
        "white-color": "#fff3ff",
        "black-color-opacity": "#00000050",
        "my-gray-color": "#ddd",
        "white-light-opacity": "#ffffff30",
        "white-medium-opacity": "#ffffff60",
      },
      keyframes: {
        "bounce-left-to-right": {
          "0%, 100%": {
            animationTimingFunction: "ease-in-out",
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "bounce-left-to-right": "bounce-left-to-right 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
