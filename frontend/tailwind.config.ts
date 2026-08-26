import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        ink: "#10121F",
        night: "#0A0D17",
        night2: "#141827",
        signal: "#3DF08C",
        signaldim: "#28A868",
        violet: "#8676F4",
        line: "#E4E1D6",
        nightline: "#252A3B",
        muted: "#6B6F80",
      },
      fontFamily: {
        display: ["var(--font-bengali)", "var(--font-display)", "sans-serif"],
        body: ["var(--font-bengali)", "var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "growth-gradient": "linear-gradient(135deg, #3DF08C 0%, #8676F4 100%)",
      },
      keyframes: {
        rise: {
          "0%": { transform: "scaleY(0.15)" },
          "100%": { transform: "scaleY(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        rise: "rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        blink: "blink 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
