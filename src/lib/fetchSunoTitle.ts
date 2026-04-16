import { createServerFn } from "@tanstack/react-start";

export const fetchSunoTitle = createServerFn({ method: "GET" })
  .validator((input: unknown) => input as string)
  .handler(async ({ data: sunoId }) => {
    try {
      const res = await fetch(`https://suno.com/song/${sunoId}`, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (!res.ok) return null;
      const html = await res.text();
      const ogMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
      if (ogMatch) return ogMatch[1];
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      if (titleMatch) return titleMatch[1].replace(/ \| Suno$/i, "").trim();
      return null;
    } catch {
      return null;
    }
  });
