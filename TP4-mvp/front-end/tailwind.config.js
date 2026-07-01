/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.ts"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--color-muted-foreground) / <alpha-value>)",
        "input-border": "rgb(var(--color-input-border) / var(--color-input-border-alpha))",
      },
      fontFamily: {
        sans: ["Inter", "System"],
      },
      boxShadow: {
        login: "0 8px 32px rgba(185, 75, 80, 0.05)",
      },
    },
  },
  plugins: [],
};
