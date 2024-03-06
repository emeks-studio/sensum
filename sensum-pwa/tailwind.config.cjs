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
    extend: {
      backgroundImage: {
        "sensum-logo":
          "url('data:image/svg+xml,%3C%3Fxml%20version%3D'1.0'%20encoding%3D'UTF-8'%3F%3E%3Csvg%20opacity%3D'.1'%20version%3D'1.1'%20viewBox%3D'0%200%20376%20250'%20xml%3Aspace%3D'preserve'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Ccircle%20fill%3D'none'%20stroke%3D'%23F9F6FB'%20stroke-width%3D'3'%20cx%3D'124.5'%20cy%3D'124.5'%20r%3D'124'%2F%3E%3Cpath%20fill%3D'%23F9F6FB'%20stroke%3D'%23F9F6FB'%20stroke-width%3D'3'%20d%3D'm124.6%20133.6c-0.4%2013-3.2%2035.4-17.8%2035.5-20.6%200.2-27-24.8-56.7-24.1-25.1%200.6-38.3%2017.5-41.8%2022.8-4.9-13.2-7.6-27.4-7.7-42.3-0.1-13.6%202-26.7%206-39%203.2-2.9%2014.6-10.9%2037-3.6%2026.8%208.8%2047.4%2065.5%2063.9%2065.4%2016.4-0.1%2017.2-23.8%2017.2-23.8l-0.1%209.1z'%2F%3E%3Ccircle%20fill%3D'none'%20stroke%3D'%23F9F6FB'%20stroke-width%3D'3'%20cx%3D'251'%20cy%3D'124.5'%20r%3D'124'%2F%3E%3Cpath%20fill%3D'%23F9F6FB'%20stroke%3D'%23F9F6FB'%20stroke-width%3D'3'%20d%3D'm251%20124.5s0.8-23.6%2017.2-23.8%2037.1%2056.6%2063.9%2065.4c22.4%207.3%2033.8-0.7%2037-3.6%204-12.3%206.1-25.4%206-39-0.1-14.9-2.8-29.1-7.7-42.3-3.5%205.3-16.7%2022.1-41.8%2022.8-29.7%200.7-36.1-24.3-56.7-24.1-14.6%200.1-17.4%2022.5-17.8%2035.5l-0.1%209.1z'%2F%3E%3C%2Fsvg%3E')",
        "custom-gradient":
          "linear-gradient(133deg,#000 0,#0b0016 35%,#0b0016 65%,#000 100%)",
      },
      keyframes: {
        "gltch-": {
          "2%, 64%": { transform: "translate(2px,0) skew(0)" },
          "4%, 60%": { transform: "translate(-2px,0) skew(0)" },
          "62%": { transform: "translate(0,0) skew(5deg)" },
        },
        gltchT: {
          "2%, 64%": { transform: "translate(2px,-2px)" },
          "4%, 60%": { transform: "translate(-2px,2px)" },
          "62%": { transform: "translate(13px,-1px) skew(-13deg)" },
        },
        gltch_: {
          "2%, 4%, 60%, 64%": { transform: "translate(-2px,0)" },
          "62%": { transform: "translate(-22px,5px) skew(21deg)" },
        },
        soar: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "gltch-after": "1.5s linear infinite gltch_",
        "gltch-before": "1s linear infinite gltchT",
        gltch: "1s linear infinite gltch-",
        soar: "2s linear infinite soar",
      },
      boxShadow: {
        soar: "0 0 10px 2px rgba(0,0,0,.3) inset",
        "soar-after": "0 2px 0 #581185 inset;",
      },
    },
  },
  plugins: [],
};
