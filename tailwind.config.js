/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}", // Catches files like index.tsx, App.tsx at the root
    "./components/**/*.{js,ts,jsx,tsx}", // Catches files in the components/ folder
    "./hooks/**/*.{js,ts,jsx,tsx}",      // Catches files in the hooks/ folder
    "./contexts/**/*.{js,ts,jsx,tsx}",   // Catches files in the contexts/ folder
    // Add other relevant directories if you use Tailwind classes there,
    // e.g., './utils/**/*.{js,ts,jsx,tsx}' or './api/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
