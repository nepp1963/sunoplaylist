import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useI18n } from "../lib/i18n";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [light, setLight] = useState(false);
  const { t } = useI18n();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
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
