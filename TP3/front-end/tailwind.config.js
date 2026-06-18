/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.ts"],
  theme: {
    extend: {
      colors: {
        background: "#fbf6f7",
        card: "#ffffff",
        foreground: "#0f1720",
        primary: "#b94b50",
        muted: "#f5eeef",
        "muted-foreground": "#7a6568",
        "input-border": "rgba(0, 0, 0, 0.1)",
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
