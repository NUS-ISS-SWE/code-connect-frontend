/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#0078C2",
        },
        success: {
          DEFAULT: "#5BBF7A",
        },
        error: {
          DEFAULT: "#D55D53",
        },
      },
    },
  },
  plugins: [],
};
