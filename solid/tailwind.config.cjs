/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro", "forest", "cupcake", "nord", "coffee"],

    darkTheme: "forest", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  theme: {
    extend: {
      colors: {
        main: "#ffd0d090",
        alt1: "#ffe9e990",
        alt2: "#a8e8ff90",
        alt3: "#ffffff90",
        taskbar: "#ffd0d090",
        window: "#ffe9e990",
        openWindow: "#c76ade",
      },
      backgroundImage: {
        desktop:
          "url('https://cdn.pixabay.com/photo/2023/05/04/02/29/cherry-blossoms-7969007_960_720.jpg')",
      },
    },
  },
};
