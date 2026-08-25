/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Driven by the theme switch, not the OS alone. See src/hooks/useTheme.ts.
  darkMode: "class",
  theme: {
    extend: {
      // Every colour resolves through a custom property so both themes stay
      // in one place (src/index.css) and the switch only swaps a class.
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        brand: "var(--brand)",
        "brand-ink": "var(--brand-ink)",
        "brand-soft": "var(--brand-soft)",
        "on-brand": "var(--on-brand)",
        good: "var(--good)",
        "good-ink": "var(--good-ink)",
        "good-soft": "var(--good-soft)",
        bad: "var(--bad)",
        "bad-ink": "var(--bad-ink)",
        "bad-soft": "var(--bad-soft)",
      },
      fontFamily: {
        display: ['"Climate Crisis"', '"Teko"', "sans-serif"],
        head: ['"Teko"', "sans-serif"],
        body: ['"Karla"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "var(--shadow)",
      },
    },
  },
  plugins: [],
};
