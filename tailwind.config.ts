import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "sans-serif"],
      },
      spacing: {
        "blog-card": "300px",
      },
      gridTemplateColumns: {
        "blog-cards": "repeat(auto-fit, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [],
};

export default config;
