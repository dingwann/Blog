const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'fade-up': 'fade-up 1s both',
      },

      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },

      keyframes: {
        'fade-up': {
          '0%': {
            opacity: 0,
            transform: 'translateY(2rem)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          }
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [
    nextui(),
  ]
}