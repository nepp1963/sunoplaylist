import { createFileRoute, Link } from "@tanstack/react-router";
import SunoPlayer from "../components/SunoPlayer";
import ThemeToggle from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";
import SocialFooter from "../components/SocialFooter";
import I18nProvider from "../components/I18nProvider";
import ColorSchemeProvider from "../components/ColorSchemeProvider";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import { useI18n } from "../lib/i18n";
import { getManualUI } from "../lib/manualI18n";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SUNO Playlist Player — Play & Manage Your SUNO Tracks" },
      { name: "description", content: "A sleek web player to manage and play music from SUNO. Add, reorder, shuffle and save your playlists." },
    ],
  }),
});

function ManualLink() {
  const { lang } = useI18n();
  const ui = getManualUI(lang);
  return (
    <a
      href="/manual"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-primary hover:underline"
    >
      {ui.openManual}
    </a>
  );
}

function Index() {
  return (
    <ColorSchemeProvider>
      <I18nProvider>
        <LanguageSelector />
        <ColorSchemeSelector />
        <ThemeToggle />
        <SunoPlayer />
        <div className="w-full flex flex-col items-center gap-2 px-4 pb-4 -mt-2">
          <ManualLink />
          <SocialFooter />
        </div>
      </I18nProvider>
    </ColorSchemeProvider>
  );
}
