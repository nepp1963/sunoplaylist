import { createFileRoute } from "@tanstack/react-router";

const SUNO_ID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

export const Route = createFileRoute("/api/public/suno-audio")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const id = new URL(request.url).searchParams.get("id") ?? "";
        if (!SUNO_ID.test(id)) return new Response("Invalid song ID", { status: 400 });

        const range = request.headers.get("range");
        const lower = id.toLowerCase();
        const candidates = [
          `https://cdn1.suno.ai/${lower}.mp4`,
          `https://cdn1.suno.ai/${lower}.mp4`,
          `https://cdn1.suno.ai/${lower}.mp3`,
        ];
        let upstream: Response | null = null;
        let isMp3 = false;
        for (const mediaUrl of candidates) {
          try {
            const r = await fetch(mediaUrl, {
              headers: {
                Accept: "video/mp4,audio/*;q=0.9,*/*;q=0.8",
                Referer: "https://suno.com/",
                ...(range ? { Range: range } : {}),
              },
            });
            if (r.ok && r.body) {
              upstream = r;
              isMp3 = mediaUrl.endsWith(".mp3");
              break;
            }
          } catch {
            /* try next */
          }
        }

        if (!upstream || !upstream.body) {
          return new Response("Audio unavailable", { status: 502 });
        }

        const headers = new Headers();
        for (const name of [
          "accept-ranges",
          "cache-control",
          "content-length",
          "content-range",
          "content-type",
          "etag",
          "last-modified",
        ]) {
          const value = upstream.headers.get(name);
          if (value) headers.set(name, value);
        }
        // The MP4 contains an AAC audio track. Advertising it as audio/mp4 lets
        // Chromium/Edge select that track when the response feeds <audio>.
        headers.set("content-type", "audio/mp4");
        headers.set("content-disposition", "inline");
        // Song audio never changes, so let browsers and the edge reuse it.
        headers.set("cache-control", "public, max-age=86400, immutable");

        return new Response(upstream.body, {
          status: upstream.status,
          headers,
        });
      },
    },
  },
});