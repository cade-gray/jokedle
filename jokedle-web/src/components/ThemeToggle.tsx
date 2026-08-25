import { Theme } from "../hooks/useTheme";
import { MoonIcon, SunIcon } from "./icons";

export const ThemeToggle = ({
  theme,
  toggleTheme,
}: {
  theme: Theme;
  toggleTheme: () => void;
}) => {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      // Keeps the visible "Light"/"Dark" inside the accessible name (WCAG 2.5.3)
      // while naming what the control actually does.
      aria-label={`Colour theme: ${isDark ? "Dark" : "Light"}`}
      onClick={toggleTheme}
      className="inline-flex min-h-[44px] cursor-pointer items-center gap-[10px] rounded-full border border-line bg-surface py-[6px] pl-3 pr-[14px] font-head text-lg font-medium uppercase tracking-[0.1em] text-ink-2 shadow-card hover:border-line-strong"
    >
      <span className="relative h-7 w-[52px] flex-none rounded-full border border-line-strong bg-surface-2">
        <span
          className="absolute top-[2px] left-[2px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand text-on-brand shadow-[0_1px_3px_rgb(0_0_0/0.3)] transition-transform duration-[280ms] ease-[cubic-bezier(0.2,0.85,0.25,1)]"
          style={{ transform: isDark ? "translateX(24px)" : "none" }}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </span>
      </span>
      <span className="min-w-[42px] text-left">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};
