/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  daisyui: {
    themes: ["night"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
