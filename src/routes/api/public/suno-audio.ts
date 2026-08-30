import { createFileRoute } from "@tanstack/react-router";

const SUNO_ID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

export const Route = createFileRoute("/api/public/suno-audio")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const id = new URL(request.url).searchParams.get("id") ?? "";
        if (!SUNO_ID.test(id)) return new Response("Invalid song ID", { status: 400 });

        const pageResponse = await fetch(`https://suno.com/song/${id.toLowerCase()}`, {
          headers: {
            Accept: "text/html,application/xhtml+xml",
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
          },
        });
        const page = pageResponse.ok ? await pageResponse.text() : "";
        const escapedId = id.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const m4aPattern = new RegExp(
          `https://[^"\\\\]+/clip/${escapedId}\\.m4a`,
          "i",
        );
        const mediaUrl = page.match(m4aPattern)?.[0]?.replace(/\\u0026/g, "&");
        if (!mediaUrl) return new Response("Audio unavailable", { status: 404 });

        const range = request.headers.get("range");
        const upstream = await fetch(mediaUrl, {
          headers: {
            Accept: "audio/mp4,audio/*;q=0.9,*/*;q=0.8",
            Referer: "https://suno.com/",
            ...(range ? { Range: range } : {}),
          },
        });

        if (!upstream.ok || !upstream.body) {
          return new Response("Audio unavailable", { status: upstream.status || 502 });
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
        if (!headers.has("content-type")) headers.set("content-type", "audio/mp4");
        headers.set("content-disposition", "inline");

        return new Response(upstream.body, {
          status: upstream.status,
          headers,
        });
      },
    },
  },
});