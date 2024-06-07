module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      mob: "600px",
      tablet: "700px",
      laptop: "840px",
      laptopl: "1600px",
    },
    extend: {
      spacing: {
        '108': '27rem',
        '120': '30rem', // following the standard of 128 / 4 = 32
      }
    },
  },
  plugins: [],
};
