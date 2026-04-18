import { useEffect, useRef, useState } from "react";
import { Languages, ChevronDown } from "lucide-react";
import { LANGUAGES, useI18n, type LangCode } from "../lib/i18n";

export default function LanguageSelector() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
        title={t("language")}
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">{current.english}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          role="listbox"
          className="mt-2 max-h-[70vh] overflow-y-auto w-64 rounded-xl bg-card border border-border shadow-xl py-1"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              onClick={() => { setLang(l.code as LangCode); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between gap-2 transition-colors ${
                l.code === lang ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
              }`}
            >
              <span>{l.english}</span>
              <span className="text-xs text-muted-foreground" dir="auto">{l.native}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
