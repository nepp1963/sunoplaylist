import { useI18n } from "../lib/i18n";

type SocialLink = { href: string; label: string; svg: React.ReactNode; hover: string };

const LINKS: SocialLink[] = [
  {
    href: "https://facebook.com/neppnft",
    label: "Facebook",
    hover: "hover:text-[#1877F2]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    href: "https://twitter.com/nepp1963",
    label: "X (Twitter)",
    hover: "hover:text-foreground",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M18.244 2H21l-6.52 7.45L22 22h-6.79l-4.74-6.2L4.99 22H2.23l6.98-7.97L2 2h6.96l4.27 5.65L18.24 2zm-2.38 18h1.88L8.21 4H6.2l9.66 16z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com/nepp1963",
    label: "Instagram",
    hover: "hover:text-[#E4405F]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.94c-3.15 0-3.5.01-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.26.82-.38.38-.62.75-.82 1.26-.15.39-.33.97-.38 2.04-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.07.23 1.65.38 2.04.2.51.44.88.82 1.26.38.38.75.62 1.26.82.39.15.97.33 2.04.38 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.26-.82.38-.38.62-.75.82-1.26.15-.39.33-.97.38-2.04.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.07-.23-1.65-.38-2.04a3.39 3.39 0 0 0-.82-1.26 3.39 3.39 0 0 0-1.26-.82c-.39-.15-.97-.33-2.04-.38C15.5 4.11 15.15 4.1 12 4.1zm0 3.3a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2zm0 7.59a3 3 0 1 0 0-5.99 3 3 0 0 0 0 5.99zm5.85-7.78a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0z" />
      </svg>
    ),
  },
  {
    href: "https://www.deviantart.com/nepp1963",
    label: "DeviantArt",
    hover: "hover:text-[#05CC47]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M19.207 4.794v-.412L18.825 4h-3.66l-.412.382-1.443 2.794-.442.265H5.176l-.382.382v3.913l.382.382h5.235l.265.412-5.5 10.412v.413l.382.381h3.66l.412-.381 1.442-2.795.442-.265h7.693l.382-.382v-3.913l-.382-.382h-5.236l-.264-.412z" />
      </svg>
    ),
  },
  {
    href: "https://youtube.com/@nepp_1963",
    label: "YouTube",
    hover: "hover:text-[#FF0000]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.13C19.55 3.5 12 3.5 12 3.5s-7.55 0-9.4.57A3 3 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3 3 0 0 0 2.1 2.13C4.45 20.5 12 20.5 12 20.5s7.55 0 9.4-.57a3 3 0 0 0 2.1-2.13C24 15.93 24 12 24 12s0-3.93-.5-5.8zM9.6 15.57V8.43L15.82 12 9.6 15.57z" />
      </svg>
    ),
  },
  {
    href: "https://crypto.com/nft/profile/nepp1963",
    label: "Crypto.com NFT",
    hover: "hover:text-[#1199FA]",
    svg: (
      <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M16 1.7 2 9.7v12.6l14 8 14-8V9.7l-14-8zm0 3.5 10.9 6.2v9.2L16 26.8 5.1 20.6v-9.2L16 5.2zm0 3.6-7.2 4.1v6.2L16 23.2l7.2-4.1v-6.2L16 8.8z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@nepp1963",
    label: "TikTok",
    hover: "hover:text-[#FF0050]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1.84-.07z"/>
      </svg>
    ),
  },
];

export default function SocialFooter() {
  const { t } = useI18n();
  return (
    <div className="w-full max-w-2xl mt-6 mb-2 flex flex-col items-center gap-3">
      <p className="text-xs tracking-wider text-muted-foreground">{t("followNepp")}</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            title={l.label}
            className={`p-2.5 rounded-xl bg-secondary text-secondary-foreground transition-all hover:bg-accent hover:scale-110 ${l.hover}`}
          >
            {l.svg}
          </a>
        ))}
      </div>
    </div>
  );
}
