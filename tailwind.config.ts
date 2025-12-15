import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          foreground: "#f8fafc"
        },
        base: {
          DEFAULT: "#0f172a",
          foreground: "#e2e8f0"
        }
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(37, 99, 235, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
