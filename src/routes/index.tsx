import { createFileRoute } from "@tanstack/react-router";
import SunoPlayer from "../components/SunoPlayer";
import ThemeToggle from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";
import SocialFooter from "../components/SocialFooter";
import I18nProvider from "../components/I18nProvider";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SUNO Playlist Player — Play & Manage Your SUNO Tracks" },
      { name: "description", content: "A sleek web player to manage and play music from SUNO. Add, reorder, shuffle and save your playlists." },
    ],
  }),
});

function Index() {
  return (
    <I18nProvider>
      <LanguageSelector />
      <ThemeToggle />
      <SunoPlayer />
      <div className="w-full flex justify-center px-4 pb-6">
        <SocialFooter />
      </div>
    </I18nProvider>
  );
}
