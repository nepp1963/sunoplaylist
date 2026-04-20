import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useI18n } from "../lib/i18n";

const THEME_KEY = "suno-theme";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [light, setLight] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light") setLight(true);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", light);
    // Force the browser UI / native form rendering to follow our theme,
    // overriding the OS-level dark preference on mobile browsers.
    root.style.colorScheme = light ? "light" : "dark";
    document.body.style.backgroundColor = light
      ? "oklch(0.97 0.005 270)"
      : "oklch(0.13 0.02 270)";
    // Update <meta name="theme-color"> so mobile browser chrome matches.
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = light ? "#f5f5f7" : "#1a1a24";
    try { localStorage.setItem(THEME_KEY, light ? "light" : "dark"); } catch { /* ignore */ }
  }, [light]);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setLight((v) => !v)}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      title={light ? t("darkMode") : t("lightMode")}
    >
      {light ? (
        <>
          <Moon className="w-4 h-4" />
          {t("darkMode")}
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
          {t("lightMode")}
        </>
      )}
    </button>
  );
}
