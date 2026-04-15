import { createFileRoute } from "@tanstack/react-router";
import SunoPlayer from "../components/SunoPlayer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Suno Playlist Player — Play & Manage Your Suno Tracks" },
      { name: "description", content: "A sleek web player to manage and play music from Suno. Add, reorder, shuffle and save your playlists." },
    ],
  }),
});

function Index() {
  return <SunoPlayer />;
}
