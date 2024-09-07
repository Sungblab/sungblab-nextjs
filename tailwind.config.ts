module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // 이 줄을 추가합니다
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nanum Gothic Coding", "monospace"],
      },
    },
  },
  plugins: [],
};
