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
          800: "#1a1a1a",
          900: "#111111",
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
