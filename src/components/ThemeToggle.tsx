import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setLight((v) => !v)}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      title={light ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {light ? (
        <>
          <Moon className="w-4 h-4" />
          Dark Mode
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
          Light Mode
        </>
      )}
    </button>
  );
}
