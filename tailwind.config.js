/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    // Add other relevant directories if you use Tailwind classes there,
    // e.g., './utils/**/*.{js,ts,jsx,tsx}' or './api/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // Define your custom brand colors here
      colors: {
        brand: {
          'bg': '#1a202c',       // Example: Dark background color
          'surface': '#2d3748',  // Example: Slightly lighter dark surface for cards/filters
          'primary': '#4299e1',  // Example: A distinct blue for primary actions/buttons
          'secondary': '#63b3ed',// Example: A lighter blue for secondary accents
          'text': '#edf2f7',     // Example: Light text color
          'dark-text': '#a0aec0', // Example: Darker text for contrasts
          'border': '#4a5568',   // Example: Border color
        },
      },
    },
  },
  plugins: [],
}
