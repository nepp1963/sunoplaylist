import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  COLOR_SCHEMES,
  DEFAULT_SCHEME_ID,
  SCHEME_STORAGE_KEY,
  applyScheme,
  readStoredScheme,
  setSchemeCookie,
  type ThemeMode,
} from "../lib/themes";

const THEME_KEY = "suno-theme";

interface ColorSchemeContextValue {
  schemeId: string;
  setSchemeId: (id: string) => void;
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  toggleMode: () => void;
  schemes: typeof COLOR_SCHEMES;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(null);

export function useColorScheme() {
  const ctx = useContext(ColorSchemeContext);
  if (!ctx) throw new Error("useColorScheme must be used within ColorSchemeProvider");
  return ctx;
}

export default function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const [schemeId, setSchemeIdState] = useState<string>(DEFAULT_SCHEME_ID);
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  // Hydrate from storage/cookie on mount
  useEffect(() => {
    const id = readStoredScheme();
    setSchemeIdState(id);
    let m: ThemeMode = "dark";
    try {
      if (localStorage.getItem(THEME_KEY) === "light") m = "light";
    } catch {
      /* ignore */
    }
    setModeState(m);
    setMounted(true);
  }, []);

  // Apply CSS variables whenever scheme or mode changes (after mount)
  useEffect(() => {
    if (!mounted) return;
    applyScheme(schemeId, mode);
    document.documentElement.classList.toggle("light", mode === "light");
    try {
      localStorage.setItem(THEME_KEY, mode);
      localStorage.setItem(SCHEME_STORAGE_KEY, schemeId);
    } catch {
      /* ignore */
    }
    setSchemeCookie(schemeId);
  }, [schemeId, mode, mounted]);

  const setSchemeId = useCallback((id: string) => setSchemeIdState(id), []);
  const setMode = useCallback((m: ThemeMode) => setModeState(m), []);
  const toggleMode = useCallback(
    () => setModeState((m) => (m === "dark" ? "light" : "dark")),
    [],
  );

  const value = useMemo(
    () => ({ schemeId, setSchemeId, mode, setMode, toggleMode, schemes: COLOR_SCHEMES }),
    [schemeId, mode, setSchemeId, setMode, toggleMode],
  );

  return <ColorSchemeContext.Provider value={value}>{children}</ColorSchemeContext.Provider>;
}
