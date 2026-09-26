import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          500: "#2f5fdb",
          600: "#254bb0",
          700: "#1c3a8a",
          900: "#101f4a",
        },
        ink: {
          900: "#0f1420",
          700: "#333c4d",
          500: "#5b6478",
          300: "#a6adbb",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
