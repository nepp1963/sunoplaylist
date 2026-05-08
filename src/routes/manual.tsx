import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/manual")({
  head: () => ({
    meta: [
      { title: "User Manual — SUNO Playlist Player" },
      { name: "description", content: "Complete guide to using the SUNO Playlist Player web app." },
    ],
  }),
  component: ManualPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-foreground mb-3 border-b border-border pb-2">{title}</h2>
      <div className="space-y-3 text-foreground/90 leading-relaxed">{children}</div>
    </section>
  );
}

function ManualPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            ← Back to Player
          </Link>
          <span className="text-xs text-muted-foreground">v1.0</span>
        </div>

        <h1 className="text-4xl font-bold mb-2">SUNO Playlist Player — User Manual</h1>
        <p className="text-muted-foreground mb-10">
          A complete guide to every feature of the app, on desktop and mobile.
        </p>

        <Section title="1. Overview">
          <p>
            SUNO Playlist Player lets you collect, organize, and play music tracks hosted on
            <strong> suno.com</strong>. Paste a SUNO link and the app fetches its title, cover art,
            and audio so you can build playlists grouped into folders.
          </p>
        </Section>

        <Section title="2. Adding Songs">
          <p><strong>Auto-load mode:</strong> Paste one or more SUNO URLs (one per line). The app
          automatically fetches each track's metadata (title, cover image, audio) and adds it to
          your current folder.</p>
          <p><strong>Manual mode:</strong> Paste a SUNO URL and provide a custom title. Useful when
          you want to override SUNO's default name.</p>
          <p>Both modes work identically on desktop and on mobile devices.</p>
        </Section>

        <Section title="3. Folders">
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Create folder</strong> — group related songs together.</li>
            <li><strong>Rename / delete</strong> folders at any time.</li>
            <li>The folder containing the currently playing song <strong>opens automatically</strong>.</li>
            <li>Tapping the player jumps to that song's folder and collapses the others.</li>
            <li>On reload, all folders start <strong>collapsed</strong>.</li>
          </ul>
        </Section>

        <Section title="4. The Player">
          <p>The player bar shows the current song's cover art and title. Controls:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Previous folder</strong> — jump to the first song of the previous folder.</li>
            <li><strong>Previous song</strong></li>
            <li><strong>Play / Pause</strong></li>
            <li><strong>Next song</strong></li>
            <li><strong>Next folder</strong> — jump to the first song of the next folder.</li>
            <li><strong>Shuffle</strong> — randomize playback order.</li>
            <li><strong>Stop</strong> — halt playback.</li>
          </ul>
          <p>Tap the player itself to locate the playing track in the playlist.</p>
        </Section>

        <Section title="5. Reordering & Editing">
          <p>Drag songs to reorder them within or between folders. Each song can be renamed,
          moved, or removed. The original order is preserved so you can revert to it.</p>
        </Section>

        <Section title="6. Save & Load Playlists">
          <p><strong>Save Playlist</strong> exports your entire library — folders <em>and</em> the
          full song data (id, URL, audio URL, title, cover image, folder assignment) — as a JSON
          file you can back up or share.</p>
          <p><strong>Load Playlist</strong> restores it exactly as saved, including titles and cover
          art. Missing fields in older files are auto-refetched from SUNO.</p>
        </Section>

        <Section title="7. Cover Art">
          <p>Every song displays its SUNO poster both in the playlist and in the player bar, on
          desktop and mobile. Cached older entries are backfilled automatically when the page
          loads.</p>
        </Section>

        <Section title="8. Appearance & Language">
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Theme toggle</strong> — switch between light and dark modes.</li>
            <li><strong>Language selector</strong> — multilingual UI with RTL support for
            applicable languages.</li>
          </ul>
        </Section>

        <Section title="9. Mobile Web App">
          <p>The app is fully responsive. Add songs (Auto-load and Manual), build folders, play,
          shuffle, save, and load playlists from any phone browser — same features as desktop.</p>
        </Section>

        <Section title="10. About & Disclaimer">
          <p>SUNO Playlist Player is an independent web app for organizing personal SUNO links.
          It does not host audio; playback streams directly from SUNO. All trademarks belong to
          their respective owners.</p>
        </Section>

        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            ← Back to Player
          </Link>
        </div>
      </div>
    </div>
  );
}
