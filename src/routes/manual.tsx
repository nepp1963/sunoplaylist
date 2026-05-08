import { createFileRoute, Link } from "@tanstack/react-router";
import I18nProvider from "../components/I18nProvider";
import LanguageSelector from "../components/LanguageSelector";
import ThemeToggle from "../components/ThemeToggle";
import { useI18n } from "../lib/i18n";
import { getManual, type ManualBlock } from "../lib/manualI18n";

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

function ManualBody() {
  const { lang } = useI18n();
  const m = getManual(lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-10 pt-20">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            {m.back}
          </Link>
          <span className="text-xs text-muted-foreground">{m.version}</span>
        </div>

        <h1 className="text-4xl font-bold mb-2">{m.title}</h1>
        <p className="text-muted-foreground mb-10">{m.subtitle}</p>

        {m.sections.map((section, i) => (
          <section key={i} className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-3 border-b border-border pb-2">
              {section.heading}
            </h2>
            <div className="space-y-3 text-foreground/90 leading-relaxed">
              {section.blocks.map((b, j) => renderBlock(b, j))}
            </div>
          </section>
        ))}

        <div className="mt-12 flex justify-center">
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
      <LanguageSelector />
      <ThemeToggle />
      <ManualBody />
    </I18nProvider>
  );
}
