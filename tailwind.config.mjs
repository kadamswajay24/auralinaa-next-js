/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Add any other paths here
  ],
  theme: {
    extend: {
      colors: {
        navy: '#2c3e50',
        'dark-blue': '#1e3a5f',
        coral: '#f05a6e',
        'coral-dark': '#d63346',
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        dancing: ['var(--font-dancing)', 'cursive'],
      },
    },
  },
  plugins: [],
};
