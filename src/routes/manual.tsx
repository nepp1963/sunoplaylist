import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import I18nProvider from "../components/I18nProvider";
import LanguageSelector from "../components/LanguageSelector";
import ThemeToggle from "../components/ThemeToggle";
import { useI18n } from "../lib/i18n";
import { getManual, getManualUI, type ManualBlock, type ManualSection } from "../lib/manualI18n";

export const Route = createFileRoute("/manual")({
  head: () => ({
    meta: [
      { title: "User Manual — SUNO Playlist Player" },
      { name: "description", content: "Complete guide to using the SUNO Playlist Player web app." },
    ],
  }),
  component: ManualPage,
});

function renderBlock(block: ManualBlock, idx: number) {
  if ("ul" in block) {
    return (
      <ul key={idx} className="list-disc pl-6 space-y-1">
        {block.ul.map((li, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: li }} />
        ))}
      </ul>
    );
  }
  return <p key={idx} dangerouslySetInnerHTML={{ __html: block.p }} />;
}

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, "");
}

function sectionMatches(section: ManualSection, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  if (section.heading.toLowerCase().includes(needle)) return true;
  return section.blocks.some((b) => {
    if ("ul" in b) return b.ul.some((li) => stripTags(li).toLowerCase().includes(needle));
    return stripTags(b.p).toLowerCase().includes(needle);
  });
}

function ManualBody() {
  const { lang } = useI18n();
  const m = getManual(lang);
  const ui = getManualUI(lang);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => m.sections.filter((s) => sectionMatches(s, query.trim())),
    [m.sections, query]
  );

  const handleDownloadPdf = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground manual-print-root">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .manual-print-root { background: white !important; color: black !important; }
          a { color: inherit !important; text-decoration: none !important; }
          section { break-inside: avoid; }
        }
      `}</style>
      <div className="max-w-3xl mx-auto px-6 py-10 pt-20">
        <div className="flex items-center justify-between mb-6 no-print">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            {m.back}
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center rounded-md border border-border bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition"
            >
              {ui.downloadPdf}
            </button>
            <span className="text-xs text-muted-foreground">{m.version}</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2">{m.title}</h1>
        <p className="text-muted-foreground mb-6">{m.subtitle}</p>

        <div className="mb-8 no-print">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={ui.search}
            className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground italic">{ui.noResults}</p>
        ) : (
          filtered.map((section, i) => (
            <section key={i} className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-3 border-b border-border pb-2">
                {section.heading}
              </h2>
              <div className="space-y-3 text-foreground/90 leading-relaxed">
                {section.blocks.map((b, j) => renderBlock(b, j))}
              </div>
            </section>
          ))
        )}

        <div className="mt-12 flex justify-center no-print">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            {m.back}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ManualPage() {
  return (
    <I18nProvider>
      <div className="no-print">
        <LanguageSelector />
        <ThemeToggle />
      </div>
      <ManualBody />
    </I18nProvider>
  );
}
