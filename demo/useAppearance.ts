import { useEffect, useState } from "react";

export type AppearanceMode = "light" | "dark" | "system";

const STORAGE_KEY = "nezha-ui-appearance";
const mediaQuery = "(prefers-color-scheme: dark)";

function storedMode(): AppearanceMode {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
}

export function useAppearance() {
  const [mode, setModeState] = useState<AppearanceMode>(storedMode);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(mediaQuery).matches);
  const resolvedMode = mode === "system" ? (systemDark ? "dark" : "light") : mode;

  useEffect(() => {
    const media = window.matchMedia(mediaQuery);
    const update = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.nzMode = mode;
    document.documentElement.dataset.nzTheme = resolvedMode;
  }, [mode, resolvedMode]);

  const setMode = (nextMode: AppearanceMode) => {
    window.localStorage.setItem(STORAGE_KEY, nextMode);
    setModeState(nextMode);
  };

  return { mode, resolvedMode, setMode };
}
