import { useEffect, useRef, useState } from "react";
import { Palette, ChevronDown, Check } from "lucide-react";
import { useColorScheme } from "./ColorSchemeProvider";

export default function ColorSchemeSelector() {
  const { schemeId, setSchemeId, schemes, mode } = useColorScheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = schemes.find((s) => s.id === schemeId) ?? schemes[0];
  const swatch = mode === "light" ? current.swatch.light : current.swatch.dark;

  return (
    <div ref={ref} className="fixed top-4 right-36 z-50 print:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Color scheme"
      >
        <Palette className="w-4 h-4" />
        <span
          className="inline-block w-3.5 h-3.5 rounded-full border border-border"
          style={{ backgroundColor: swatch }}
          aria-hidden
        />
        <span className="hidden sm:inline">{current.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          role="listbox"
          className="mt-2 w-56 rounded-xl bg-card border border-border shadow-xl py-1"
        >
          {schemes.map((s) => {
            const sw = mode === "light" ? s.swatch.light : s.swatch.dark;
            const selected = s.id === schemeId;
            return (
              <button
                key={s.id}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  setSchemeId(s.id);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                  selected ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
                }`}
              >
                <span
                  className="inline-block w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: sw }}
                  aria-hidden
                />
                <span className="flex-1">{s.name}</span>
                {selected && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
