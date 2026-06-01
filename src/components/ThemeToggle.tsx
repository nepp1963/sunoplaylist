import { Sun, Moon } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { useColorScheme } from "./ColorSchemeProvider";

export default function ThemeToggle() {
  const { mode, toggleMode } = useColorScheme();
  const { t } = useI18n();
  const light = mode === "light";

  return (
    <button
      onClick={toggleMode}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors print:hidden"
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
