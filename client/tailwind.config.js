const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/assets/background-circle.a428010c.png')",
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
