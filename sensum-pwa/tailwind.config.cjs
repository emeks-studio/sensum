module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,res,jsx}"],
  theme: {
    fontFamily: {
      mono: ["monospace"],
      sans: [
        "'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'",
      ],
    },
    extend: {},
  },
  plugins: [],
};
