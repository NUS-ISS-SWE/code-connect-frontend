/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
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
