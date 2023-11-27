/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}", "./src/*.tsx"],
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      success: {
        DEFAULT: "#53B175",
      },
      pending: {
        DEFAULT: "#F79009",
      },
      error: {
        DEFAULT: "#EB5757",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Jost Variable", "sans-serif"],
      },
      screens: {
        mdl: "850px",
      },
    },
  },
  plugins: ["@tailwindcss/line-clamp"],
};
