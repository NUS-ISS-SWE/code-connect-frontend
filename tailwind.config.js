/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1976D2",
          100: "#176ABD",
          200: "#145EA8",
          300: "#125393",
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
