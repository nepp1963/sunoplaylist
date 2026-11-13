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

const SUNO_HOSTS = new Set(["suno.com", "www.suno.com"]);
const SONG_ID_PATTERN = "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}";

function normalizeSunoPageUrl(input: string): URL | null {
  const clean = stripLinkPunctuation(input.trim());
  if (!clean || clean.length > 2048) return null;

  const uuidOnly = new RegExp(`^${SONG_ID_PATTERN}$`, "i").test(clean);
  let url: URL;
  try {
    url = new URL(
      uuidOnly
        ? `https://suno.com/song/${clean}`
        : /^[a-z][a-z\d+.-]*:\/\//i.test(clean)
          ? clean
          : `https://${clean}`,
    );
  } catch {
    return null;
  }

  if (
    url.protocol !== "https:" ||
    !SUNO_HOSTS.has(url.hostname.toLowerCase()) ||
    (url.port !== "" && url.port !== "443") ||
    url.username !== "" ||
    url.password !== ""
  ) {
    return null;
  }

  const path = url.pathname.replace(/\/$/, "");
  const songPath = new RegExp(`^/song/(${SONG_ID_PATTERN})$`, "i");
  const shortPath = /^\/s\/[a-z0-9_-]{1,128}$/i;
  if (!songPath.test(path) && !shortPath.test(path)) return null;

  // Keep only a validated song or short-link path; never forward arbitrary query data.
  return new URL(`https://${url.hostname.toLowerCase()}${path}`);
}

function validateMetaInput(input: unknown): string {
  return typeof input === "string" && input.length <= 2048 ? input : "";
}

function extractUuid(value: string): string | null {
  return (
    value
      .match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i)?.[0]
      .toLowerCase() ?? null
  );
}

function metaContent(html: string, name: string): string | null {
  const tags = html.match(/<meta\s+[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) =>
    new RegExp(
      `(?:property|name)=["']${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`,
      "i",
    ).test(candidate),
  );
  return decodeHtmlEntities(tag?.match(/content=["']([^"']*)["']/i)?.[1] ?? "") || null;
}

function canonicalUrl(html: string): string | null {
  const links = html.match(/<link\s+[^>]*>/gi) ?? [];
  const canonical = links.find((tag) => /\brel=["'][^"']*\bcanonical\b[^"']*["']/i.test(tag));
  return canonical?.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? null;
}

type SunoMeta = {
  id: string;
  url: string;
  audioUrl: string;
  title: string | null;
  image: string | null;
};

// Server-side memo: the same song page is often requested by several visitors
// (and repeatedly during backfill), and Suno's HTML rarely changes.
const serverCache = new Map<string, { at: number; value: SunoMeta | null }>();
const SERVER_TTL = 30 * 60 * 1000;

export const fetchSunoMeta = createServerFn({ method: "GET" })
  .inputValidator(validateMetaInput)
  .handler(async ({ data: input }): Promise<SunoMeta | null> => fetchValidatedSunoMeta(input));

async function fetchValidatedSunoMeta(input: string): Promise<SunoMeta | null> {
  const pageUrl = normalizeSunoPageUrl(input);
  if (!pageUrl) return null;
  const cacheKey = pageUrl.href.toLowerCase();
  const cached = serverCache.get(cacheKey);
  if (cached && Date.now() - cached.at < SERVER_TTL) return cached.value;
  const remember = (value: SunoMeta | null) => {
    if (serverCache.size > 500) serverCache.clear();
    serverCache.set(cacheKey, { at: Date.now(), value });
    return value;
  };
  try {
    let currentUrl = pageUrl;
    let res: Response | null = null;
    for (let redirectCount = 0; redirectCount <= 3; redirectCount += 1) {
      const response = await fetch(currentUrl.href, {
        redirect: "manual",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          Accept: "text/html,application/xhtml+xml",
        },
      });
      if (![301, 302, 303, 307, 308].includes(response.status)) {
        res = response;
        break;
      }
      const location = response.headers.get("location");
      if (!location) return remember(null);
      const nextUrl = normalizeSunoPageUrl(new URL(location, currentUrl).href);
      if (!nextUrl) return remember(null);
      currentUrl = nextUrl;
    }
    if (!res) return remember(null);
    if (!res.ok) return remember(null);
    const html = await res.text();

    const canonical = canonicalUrl(html) ?? metaContent(html, "og:url") ?? res.url;

    const ogTitle = metaContent(html, "og:title");
    const titleTag = html.match(/<title>([^<]+)<\/title>/i);
    const ogImage = metaContent(html, "og:image") ?? metaContent(html, "twitter:image");
    const audioUrl =
      html.match(/audio_url\\":\\"([^\\"]+)/i)?.[1] ??
      metaContent(html, "og:audio") ??
      metaContent(html, "twitter:player:stream") ??
      html.match(/https:\/\/cdn1\.suno\.ai\/[a-f0-9-]+\.mp3/i)?.[0] ??
      null;
    // Never use an arbitrary UUID found elsewhere in the page. Short-link pages can
    // contain unrelated request/asset IDs, which previously caused false duplicates.
    const sunoId =
      extractUuid(canonical) ??
      extractUuid(res.url) ??
      extractUuid(audioUrl ?? "") ??
      extractUuid(currentUrl.pathname);
    if (!sunoId) return remember(null);

    const title = ogTitle
      ? ogTitle
      : titleTag
        ? decodeHtmlEntities(titleTag[1].replace(/ \| Suno$/i, "").trim())
        : null;

    const image = ogImage || null;

    return remember({
      id: sunoId,
      url: `https://suno.com/song/${sunoId}`,
      audioUrl: audioUrl ?? `https://cdn1.suno.ai/${sunoId}.mp3`,
      title,
      image,
    });
  } catch {
    return null;
  }
}

// ---- Browser-side helper: memoize + de-duplicate + limit concurrency ----
const clientCache = new Map<string, SunoMeta | null>();
const inFlight = new Map<string, Promise<SunoMeta | null>>();
let active = 0;
const queue: Array<() => void> = [];
const MAX_PARALLEL = 6;

function runNext() {
  if (active >= MAX_PARALLEL) return;
  const job = queue.shift();
  if (!job) return;
  active += 1;
  job();
}

/**
 * Fetches song metadata with a local cache so the same link is never fetched
 * twice, and at most a handful of requests run at once (faster overall than
 * firing an entire playlist's worth of requests simultaneously).
 */
export function getSunoMeta(url: string): Promise<SunoMeta | null> {
  const key = String(url || "")
    .trim()
    .toLowerCase();
  if (clientCache.has(key)) return Promise.resolve(clientCache.get(key) ?? null);
  const pending = inFlight.get(key);
  if (pending) return pending;

  const promise = new Promise<SunoMeta | null>((resolve) => {
    queue.push(() => {
      fetchSunoMeta({ data: url })
        .then((meta) => {
          clientCache.set(key, meta ?? null);
          resolve(meta ?? null);
        })
        .catch(() => resolve(null))
        .finally(() => {
          active -= 1;
          inFlight.delete(key);
          runNext();
        });
    });
    runNext();
  });

  inFlight.set(key, promise);
  return promise;
}

// Keep backward compat alias
export const fetchSunoTitle = createServerFn({ method: "GET" })
  .inputValidator(validateMetaInput)
  .handler(async ({ data: sunoId }) => {
    const result = await fetchValidatedSunoMeta(sunoId);
    return result?.title ?? null;
  });
