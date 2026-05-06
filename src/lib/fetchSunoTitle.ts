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

function stripLinkPunctuation(value: string): string {
  return value.trim().replace(/[\])}>,.;!?]+$/g, "");
}

function normalizeSunoInput(input: string): string {
  const clean = stripLinkPunctuation(input.trim());
  return clean.startsWith("http") ? clean : `https://${clean.replace(/^suno\./i, "suno.")}`;
}

function extractUuid(value: string): string | null {
  return (
    value.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i)?.[0].toLowerCase() ??
    null
  );
}

function metaContent(html: string, name: string): string | null {
  const tags = html.match(/<meta\s+[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) =>
    new RegExp(`(?:property|name)=["']${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i").test(candidate),
  );
  return decodeHtmlEntities(tag?.match(/content=["']([^"']*)["']/i)?.[1] ?? "") || null;
}

export const fetchSunoMeta = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => input as string)
  .handler(async ({ data: input }) => {
    try {
      const initial = stripLinkPunctuation(String(input || ""));
      const initialUuid = extractUuid(initial);
      const pageUrl = initialUuid ? `https://suno.com/song/${initialUuid}` : normalizeSunoInput(initial);
      const res = await fetch(pageUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          Accept: "text/html,application/xhtml+xml",
        },
      });
      if (!res.ok) return null;
      const html = await res.text();

      const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1] ?? res.url;
      const sunoId = extractUuid(canonical) ?? extractUuid(html) ?? initialUuid;
      if (!sunoId) return null;

      const ogTitle = metaContent(html, "og:title");
      const titleTag = html.match(/<title>([^<]+)<\/title>/i);
      const ogImage = metaContent(html, "og:image") ?? metaContent(html, "twitter:image");
      const audioUrl =
        html.match(/audio_url\\":\\"([^\\"]+)/i)?.[1] ??
        metaContent(html, "og:audio") ??
        metaContent(html, "twitter:player:stream") ??
        html.match(/https:\/\/cdn1\.suno\.ai\/[a-f0-9-]+\.mp3/i)?.[0] ??
        `https://cdn1.suno.ai/${sunoId}.mp3`;

      const title = ogTitle
        ? ogTitle
        : titleTag
          ? decodeHtmlEntities(titleTag[1].replace(/ \| Suno$/i, "").trim())
          : null;

      const image = ogImage || null;

      return { id: sunoId, url: `https://suno.com/song/${sunoId}`, audioUrl, title, image };
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
