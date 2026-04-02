import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: "#c4704b",
          light: "#d4906e",
          pale: "#e8c4b0",
          bg: "#f5ece6",
          dark: "#2a1f1a",
        },
        warm: {
          50: "#faf7f5",
          100: "#f5ece6",
          200: "#e5ddd7",
          300: "#d4c8c0",
          400: "#b0a49c",
          500: "#918479",
          600: "#7a6e69",
          700: "#555555",
          800: "#1a1a1a",
          850: "#2a2a2a",
          900: "#111111",
          950: "#0f0f0f",
        },
      },
      fontFamily: {
        heading: [
          "Space Grotesk",
          "Pretendard Variable",
          "Pretendard",
          "sans-serif",
        ],
        sans: ["Inter", "Pretendard Variable", "Pretendard", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
