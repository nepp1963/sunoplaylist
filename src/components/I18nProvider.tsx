import { useEffect, useMemo, useState, type ReactNode } from "react";
import { I18nContext, LANGUAGES, RTL_LANGS, TRANSLATIONS, type LangCode, type TranslationKey } from "../lib/i18n";

const STORAGE_KEY = "suno-lang";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        setLangState(saved);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: (l: LangCode) => {
        setLangState(l);
        try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
      },
      t: (key: TranslationKey) => TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key],
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
