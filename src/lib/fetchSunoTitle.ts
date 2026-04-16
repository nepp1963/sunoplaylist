import { createServerFn } from "@tanstack/react-start";

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

export const fetchSunoMeta = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => input as string)
  .handler(async ({ data: sunoId }) => {
    try {
      const res = await fetch(`https://suno.com/song/${sunoId}`, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (!res.ok) return null;
      const html = await res.text();

      const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
      const titleTag = html.match(/<title>([^<]+)<\/title>/i);
      const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);

      const title = ogTitle
        ? decodeHtmlEntities(ogTitle[1])
        : titleTag
          ? decodeHtmlEntities(titleTag[1].replace(/ \| Suno$/i, "").trim())
          : null;

      const image = ogImage ? ogImage[1] : null;

      return { title, image };
    } catch {
      return null;
    }
  });

// Keep backward compat alias
export const fetchSunoTitle = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => input as string)
  .handler(async ({ data: sunoId }) => {
    const result = await fetchSunoMeta({ data: sunoId });
    return result?.title ?? null;
  });
