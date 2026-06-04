// Color scheme definitions. Each scheme provides CSS variable values
// for both dark and light modes. Values use OKLCH to match styles.css.

export type ThemeMode = "dark" | "light";

export interface ThemeVars {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  surface: string;
  "surface-foreground": string;
  glow: string;
  metaColor: string;
  bodyBg: string;
}

export interface ColorScheme {
  id: string;
  name: string;
  swatch: { dark: string; light: string }; // CSS color for preview dot
  dark: ThemeVars;
  light: ThemeVars;
}

const D = (v: Partial<ThemeVars>): ThemeVars => ({
  background: "oklch(0.13 0.02 270)",
  foreground: "oklch(0.95 0.01 270)",
  card: "oklch(0.18 0.02 270)",
  "card-foreground": "oklch(0.95 0.01 270)",
  popover: "oklch(0.18 0.02 270)",
  "popover-foreground": "oklch(0.95 0.01 270)",
  primary: "oklch(0.72 0.2 150)",
  "primary-foreground": "oklch(0.13 0.02 270)",
  secondary: "oklch(0.22 0.02 270)",
  "secondary-foreground": "oklch(0.85 0.01 270)",
  muted: "oklch(0.22 0.015 270)",
  "muted-foreground": "oklch(0.6 0.02 270)",
  accent: "oklch(0.65 0.25 330)",
  "accent-foreground": "oklch(0.95 0.01 270)",
  destructive: "oklch(0.6 0.22 25)",
  "destructive-foreground": "oklch(0.95 0.01 270)",
  border: "oklch(0.28 0.02 270)",
  input: "oklch(0.22 0.02 270)",
  ring: "oklch(0.72 0.2 150)",
  surface: "oklch(0.16 0.02 270)",
  "surface-foreground": "oklch(0.9 0.01 270)",
  glow: "oklch(0.72 0.2 150 / 25%)",
  metaColor: "#1a1a24",
  bodyBg: "oklch(0.13 0.02 270)",
  ...v,
});

const L = (v: Partial<ThemeVars>): ThemeVars => ({
  background: "oklch(0.97 0.005 270)",
  foreground: "oklch(0.15 0.02 270)",
  card: "oklch(1 0 0)",
  "card-foreground": "oklch(0.15 0.02 270)",
  popover: "oklch(1 0 0)",
  "popover-foreground": "oklch(0.15 0.02 270)",
  primary: "oklch(0.55 0.22 150)",
  "primary-foreground": "oklch(0.98 0.005 270)",
  secondary: "oklch(0.93 0.005 270)",
  "secondary-foreground": "oklch(0.3 0.02 270)",
  muted: "oklch(0.92 0.005 270)",
  "muted-foreground": "oklch(0.45 0.02 270)",
  accent: "oklch(0.55 0.25 330)",
  "accent-foreground": "oklch(0.98 0.005 270)",
  destructive: "oklch(0.55 0.22 25)",
  "destructive-foreground": "oklch(0.98 0.005 270)",
  border: "oklch(0.88 0.01 270)",
  input: "oklch(0.92 0.005 270)",
  ring: "oklch(0.55 0.22 150)",
  surface: "oklch(0.95 0.005 270)",
  "surface-foreground": "oklch(0.2 0.02 270)",
  glow: "oklch(0.55 0.22 150 / 45%)",
  metaColor: "#f5f5f7",
  bodyBg: "oklch(0.97 0.005 270)",
  ...v,
});

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    id: "emerald",
    name: "Emerald",
    swatch: { dark: "#34d399", light: "#10b981" },
    dark: D({}),
    light: L({}),
  },
  {
    id: "ocean",
    name: "Ocean",
    swatch: { dark: "#38bdf8", light: "#0284c7" },
    dark: D({
      background: "oklch(0.14 0.03 240)",
      bodyBg: "oklch(0.14 0.03 240)",
      foreground: "oklch(0.95 0.01 240)",
      card: "oklch(0.19 0.03 240)",
      "card-foreground": "oklch(0.95 0.01 240)",
      popover: "oklch(0.19 0.03 240)",
      "popover-foreground": "oklch(0.95 0.01 240)",
      primary: "oklch(0.72 0.16 230)",
      "primary-foreground": "oklch(0.14 0.03 240)",
      secondary: "oklch(0.23 0.03 240)",
      "secondary-foreground": "oklch(0.85 0.01 240)",
      muted: "oklch(0.23 0.02 240)",
      "muted-foreground": "oklch(0.62 0.03 240)",
      accent: "oklch(0.7 0.18 200)",
      "accent-foreground": "oklch(0.13 0.03 240)",
      border: "oklch(0.3 0.03 240)",
      input: "oklch(0.23 0.03 240)",
      ring: "oklch(0.72 0.16 230)",
      surface: "oklch(0.17 0.03 240)",
      "surface-foreground": "oklch(0.9 0.01 240)",
      glow: "oklch(0.72 0.16 230 / 25%)",
      metaColor: "#0f1a2b",
    }),
    light: L({
      background: "oklch(0.97 0.02 230)",
      bodyBg: "oklch(0.97 0.02 230)",
      foreground: "oklch(0.18 0.04 240)",
      card: "oklch(1 0.005 230)",
      "card-foreground": "oklch(0.18 0.04 240)",
      popover: "oklch(1 0.005 230)",
      "popover-foreground": "oklch(0.18 0.04 240)",
      primary: "oklch(0.5 0.18 230)",
      "primary-foreground": "oklch(0.98 0.005 230)",
      secondary: "oklch(0.92 0.03 230)",
      "secondary-foreground": "oklch(0.25 0.04 240)",
      muted: "oklch(0.92 0.02 230)",
      "muted-foreground": "oklch(0.42 0.04 240)",
      accent: "oklch(0.55 0.18 200)",
      "accent-foreground": "oklch(0.98 0.005 230)",
      border: "oklch(0.85 0.03 230)",
      input: "oklch(0.92 0.03 230)",
      ring: "oklch(0.5 0.18 230)",
      surface: "oklch(0.95 0.02 230)",
      "surface-foreground": "oklch(0.2 0.04 240)",
      glow: "oklch(0.5 0.18 230 / 45%)",
      metaColor: "#e7f1fb",
    }),
  },
  {
    id: "sunset",
    name: "Sunset",
    swatch: { dark: "#fb923c", light: "#ea580c" },
    dark: D({
      background: "oklch(0.15 0.03 30)",
      bodyBg: "oklch(0.15 0.03 30)",
      foreground: "oklch(0.95 0.02 60)",
      card: "oklch(0.2 0.03 30)",
      "card-foreground": "oklch(0.95 0.02 60)",
      popover: "oklch(0.2 0.03 30)",
      "popover-foreground": "oklch(0.95 0.02 60)",
      primary: "oklch(0.74 0.18 50)",
      "primary-foreground": "oklch(0.15 0.03 30)",
      secondary: "oklch(0.24 0.03 30)",
      "secondary-foreground": "oklch(0.88 0.02 60)",
      muted: "oklch(0.24 0.02 30)",
      "muted-foreground": "oklch(0.65 0.04 40)",
      accent: "oklch(0.68 0.22 350)",
      "accent-foreground": "oklch(0.98 0.01 60)",
      border: "oklch(0.3 0.03 30)",
      input: "oklch(0.24 0.03 30)",
      ring: "oklch(0.74 0.18 50)",
      surface: "oklch(0.18 0.03 30)",
      "surface-foreground": "oklch(0.9 0.02 60)",
      glow: "oklch(0.74 0.18 50 / 30%)",
      metaColor: "#2a1a14",
    }),
    light: L({
      background: "oklch(0.98 0.02 60)",
      bodyBg: "oklch(0.98 0.02 60)",
      foreground: "oklch(0.2 0.03 30)",
      card: "oklch(1 0.01 60)",
      "card-foreground": "oklch(0.2 0.03 30)",
      popover: "oklch(1 0.01 60)",
      "popover-foreground": "oklch(0.2 0.03 30)",
      primary: "oklch(0.6 0.2 45)",
      "primary-foreground": "oklch(0.98 0.01 60)",
      secondary: "oklch(0.93 0.03 50)",
      "secondary-foreground": "oklch(0.28 0.03 30)",
      muted: "oklch(0.93 0.02 50)",
      "muted-foreground": "oklch(0.45 0.04 40)",
      accent: "oklch(0.58 0.22 350)",
      "accent-foreground": "oklch(0.98 0.01 60)",
      border: "oklch(0.86 0.03 50)",
      input: "oklch(0.93 0.03 50)",
      ring: "oklch(0.6 0.2 45)",
      surface: "oklch(0.96 0.02 60)",
      "surface-foreground": "oklch(0.22 0.03 30)",
      glow: "oklch(0.6 0.2 45 / 45%)",
      metaColor: "#fdf2e6",
    }),
  },
  {
    id: "lavender",
    name: "Lavender",
    swatch: { dark: "#a78bfa", light: "#7c3aed" },
    dark: D({
      background: "oklch(0.14 0.03 290)",
      bodyBg: "oklch(0.14 0.03 290)",
      foreground: "oklch(0.95 0.01 290)",
      card: "oklch(0.19 0.03 290)",
      "card-foreground": "oklch(0.95 0.01 290)",
      popover: "oklch(0.19 0.03 290)",
      "popover-foreground": "oklch(0.95 0.01 290)",
      primary: "oklch(0.74 0.18 295)",
      "primary-foreground": "oklch(0.14 0.03 290)",
      secondary: "oklch(0.23 0.03 290)",
      "secondary-foreground": "oklch(0.86 0.01 290)",
      muted: "oklch(0.23 0.02 290)",
      "muted-foreground": "oklch(0.62 0.03 290)",
      accent: "oklch(0.7 0.2 320)",
      "accent-foreground": "oklch(0.98 0.01 290)",
      border: "oklch(0.3 0.03 290)",
      input: "oklch(0.23 0.03 290)",
      ring: "oklch(0.74 0.18 295)",
      surface: "oklch(0.17 0.03 290)",
      "surface-foreground": "oklch(0.9 0.01 290)",
      glow: "oklch(0.74 0.18 295 / 30%)",
      metaColor: "#1c1430",
    }),
    light: L({
      background: "oklch(0.98 0.02 290)",
      bodyBg: "oklch(0.98 0.02 290)",
      foreground: "oklch(0.18 0.03 290)",
      card: "oklch(1 0.01 290)",
      "card-foreground": "oklch(0.18 0.03 290)",
      popover: "oklch(1 0.01 290)",
      "popover-foreground": "oklch(0.18 0.03 290)",
      primary: "oklch(0.52 0.22 295)",
      "primary-foreground": "oklch(0.98 0.01 290)",
      secondary: "oklch(0.93 0.03 290)",
      "secondary-foreground": "oklch(0.28 0.03 290)",
      muted: "oklch(0.93 0.02 290)",
      "muted-foreground": "oklch(0.45 0.03 290)",
      accent: "oklch(0.55 0.22 320)",
      "accent-foreground": "oklch(0.98 0.01 290)",
      border: "oklch(0.86 0.03 290)",
      input: "oklch(0.93 0.03 290)",
      ring: "oklch(0.52 0.22 295)",
      surface: "oklch(0.96 0.02 290)",
      "surface-foreground": "oklch(0.2 0.03 290)",
      glow: "oklch(0.52 0.22 295 / 45%)",
      metaColor: "#efeafd",
    }),
  },
  {
    id: "noir",
    name: "Noir Gold",
    swatch: { dark: "#d4af37", light: "#b8860b" },
    dark: D({
      background: "oklch(0.1 0.005 90)",
      bodyBg: "oklch(0.1 0.005 90)",
      foreground: "oklch(0.94 0.02 90)",
      card: "oklch(0.15 0.005 90)",
      "card-foreground": "oklch(0.94 0.02 90)",
      popover: "oklch(0.15 0.005 90)",
      "popover-foreground": "oklch(0.94 0.02 90)",
      primary: "oklch(0.78 0.13 85)",
      "primary-foreground": "oklch(0.1 0.005 90)",
      secondary: "oklch(0.2 0.005 90)",
      "secondary-foreground": "oklch(0.88 0.02 90)",
      muted: "oklch(0.2 0.005 90)",
      "muted-foreground": "oklch(0.6 0.02 90)",
      accent: "oklch(0.65 0.15 60)",
      "accent-foreground": "oklch(0.1 0.005 90)",
      border: "oklch(0.25 0.005 90)",
      input: "oklch(0.2 0.005 90)",
      ring: "oklch(0.78 0.13 85)",
      surface: "oklch(0.13 0.005 90)",
      "surface-foreground": "oklch(0.9 0.02 90)",
      glow: "oklch(0.78 0.13 85 / 30%)",
      metaColor: "#16140d",
    }),
    light: L({
      background: "oklch(0.97 0.015 85)",
      bodyBg: "oklch(0.97 0.015 85)",
      foreground: "oklch(0.18 0.01 90)",
      card: "oklch(1 0.008 85)",
      "card-foreground": "oklch(0.18 0.01 90)",
      popover: "oklch(1 0.008 85)",
      "popover-foreground": "oklch(0.18 0.01 90)",
      primary: "oklch(0.55 0.13 75)",
      "primary-foreground": "oklch(0.98 0.01 85)",
      secondary: "oklch(0.92 0.02 85)",
      "secondary-foreground": "oklch(0.25 0.02 90)",
      muted: "oklch(0.92 0.015 85)",
      "muted-foreground": "oklch(0.42 0.02 90)",
      accent: "oklch(0.55 0.15 60)",
      "accent-foreground": "oklch(0.98 0.01 85)",
      border: "oklch(0.85 0.02 85)",
      input: "oklch(0.92 0.02 85)",
      ring: "oklch(0.55 0.13 75)",
      surface: "oklch(0.95 0.015 85)",
      "surface-foreground": "oklch(0.2 0.02 90)",
      glow: "oklch(0.55 0.13 75 / 45%)",
      metaColor: "#f5efdf",
    }),
  },
  {
    id: "rose",
    name: "Rose",
    swatch: { dark: "#fb7185", light: "#e11d48" },
    dark: D({
      background: "oklch(0.14 0.03 5)",
      bodyBg: "oklch(0.14 0.03 5)",
      foreground: "oklch(0.95 0.01 5)",
      card: "oklch(0.19 0.03 5)",
      "card-foreground": "oklch(0.95 0.01 5)",
      popover: "oklch(0.19 0.03 5)",
      "popover-foreground": "oklch(0.95 0.01 5)",
      primary: "oklch(0.72 0.2 5)",
      "primary-foreground": "oklch(0.14 0.03 5)",
      secondary: "oklch(0.23 0.03 5)",
      "secondary-foreground": "oklch(0.86 0.01 5)",
      muted: "oklch(0.23 0.02 5)",
      "muted-foreground": "oklch(0.62 0.03 5)",
      accent: "oklch(0.7 0.2 340)",
      "accent-foreground": "oklch(0.98 0.01 5)",
      border: "oklch(0.3 0.03 5)",
      input: "oklch(0.23 0.03 5)",
      ring: "oklch(0.72 0.2 5)",
      surface: "oklch(0.17 0.03 5)",
      "surface-foreground": "oklch(0.9 0.01 5)",
      glow: "oklch(0.72 0.2 5 / 30%)",
      metaColor: "#2b1218",
    }),
    light: L({
      background: "oklch(0.98 0.02 5)",
      bodyBg: "oklch(0.98 0.02 5)",
      foreground: "oklch(0.18 0.03 5)",
      card: "oklch(1 0.01 5)",
      "card-foreground": "oklch(0.18 0.03 5)",
      popover: "oklch(1 0.01 5)",
      "popover-foreground": "oklch(0.18 0.03 5)",
      primary: "oklch(0.55 0.22 5)",
      "primary-foreground": "oklch(0.98 0.01 5)",
      secondary: "oklch(0.93 0.03 5)",
      "secondary-foreground": "oklch(0.28 0.03 5)",
      muted: "oklch(0.93 0.02 5)",
      "muted-foreground": "oklch(0.45 0.03 5)",
      accent: "oklch(0.55 0.22 340)",
      "accent-foreground": "oklch(0.98 0.01 5)",
      border: "oklch(0.86 0.03 5)",
      input: "oklch(0.93 0.03 5)",
      ring: "oklch(0.55 0.22 5)",
      surface: "oklch(0.96 0.02 5)",
      "surface-foreground": "oklch(0.2 0.03 5)",
      glow: "oklch(0.55 0.22 5 / 45%)",
      metaColor: "#fbe7eb",
    }),
  },
];

export const DEFAULT_SCHEME_ID = "emerald";
export const SCHEME_STORAGE_KEY = "suno-scheme";
export const SCHEME_COOKIE = "suno-scheme";

export function getScheme(id: string): ColorScheme {
  return COLOR_SCHEMES.find((s) => s.id === id) ?? COLOR_SCHEMES[0];
}

export function applyScheme(id: string, mode: ThemeMode): void {
  if (typeof document === "undefined") return;
  const scheme = getScheme(id);
  const vars = mode === "light" ? scheme.light : scheme.dark;
  const root = document.documentElement;
  const cssMap: Record<string, string> = {
    "--background": vars.background,
    "--foreground": vars.foreground,
    "--card": vars.card,
    "--card-foreground": vars["card-foreground"],
    "--popover": vars.popover,
    "--popover-foreground": vars["popover-foreground"],
    "--primary": vars.primary,
    "--primary-foreground": vars["primary-foreground"],
    "--secondary": vars.secondary,
    "--secondary-foreground": vars["secondary-foreground"],
    "--muted": vars.muted,
    "--muted-foreground": vars["muted-foreground"],
    "--accent": vars.accent,
    "--accent-foreground": vars["accent-foreground"],
    "--destructive": vars.destructive,
    "--destructive-foreground": vars["destructive-foreground"],
    "--border": vars.border,
    "--input": vars.input,
    "--ring": vars.ring,
    "--surface": vars.surface,
    "--surface-foreground": vars["surface-foreground"],
    "--glow": vars.glow,
  };
  Object.entries(cssMap).forEach(([k, v]) => root.style.setProperty(k, v));
  root.style.colorScheme = mode;
  document.body.style.backgroundColor = vars.bodyBg;
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = vars.metaColor;
}

export function setSchemeCookie(id: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SCHEME_COOKIE}=${encodeURIComponent(id)}; path=/; max-age=31536000; SameSite=Lax`;
}

export function readSchemeCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${SCHEME_COOKIE}=`));
  if (!match) return null;
  try {
    return decodeURIComponent(match.split("=")[1] ?? "");
  } catch {
    return null;
  }
}

export function readStoredScheme(): string {
  if (typeof window === "undefined") return DEFAULT_SCHEME_ID;
  try {
    const fromStorage = localStorage.getItem(SCHEME_STORAGE_KEY);
    if (fromStorage && COLOR_SCHEMES.some((s) => s.id === fromStorage)) return fromStorage;
  } catch {
    /* ignore */
  }
  const fromCookie = readSchemeCookie();
  if (fromCookie && COLOR_SCHEMES.some((s) => s.id === fromCookie)) return fromCookie;
  return DEFAULT_SCHEME_ID;
}
