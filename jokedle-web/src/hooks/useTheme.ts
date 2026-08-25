import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

/** Keep in sync with the pre-paint script in index.html. */
const STORAGE_KEY = "jokedle-theme";

const systemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const storedTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    // Storage can throw in private mode or when site data is blocked.
    return null;
  }
};

/**
 * The OS preference is the starting point; the switch overrides it and the
 * choice is remembered. While the player has made no choice we keep following
 * the OS, so changing it system-wide still moves the site.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => storedTheme() ?? systemTheme());
  const [isExplicit, setIsExplicit] = useState<boolean>(() => storedTheme() !== null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (isExplicit) return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => setTheme(event.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [isExplicit]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Not being able to remember the choice is not worth failing over.
      }
      return next;
    });
    setIsExplicit(true);
  }, []);

  return { theme, toggleTheme };
};
