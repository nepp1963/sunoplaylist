import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useI18n } from "../lib/i18n";

const LINKS = [
  { href: "https://facebook.com/neppnft", label: "Facebook", icon: <Facebook className="w-5 h-5" />, color: "hover:text-[#1877F2]" },
  { href: "https://twitter.com/nepp1963", label: "Twitter / X", icon: <Twitter className="w-5 h-5" />, color: "hover:text-[#1DA1F2]" },
  { href: "https://instagram.com/nepp1963", label: "Instagram", icon: <Instagram className="w-5 h-5" />, color: "hover:text-[#E4405F]" },
  {
    href: "https://www.deviantart.com/nepp1963",
    label: "DeviantArt",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M19.207 4.794v-.412L18.825 4h-3.66l-.412.382-1.443 2.794-.442.265H5.176l-.382.382v3.913l.382.382h5.235l.265.412-5.5 10.412v.413l.382.381h3.66l.412-.381 1.442-2.795.442-.265h7.693l.382-.382v-3.913l-.382-.382h-5.236l-.264-.412z" />
      </svg>
    ),
    color: "hover:text-[#05CC47]",
  },
  { href: "https://youtube.com/@nepp_1963", label: "YouTube", icon: <Youtube className="w-5 h-5" />, color: "hover:text-[#FF0000]" },
  {
    href: "https://crypto.com/nft/profile/nepp1963",
    label: "Crypto.com NFT",
    icon: (
      <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M16 1.7 2 9.7v12.6l14 8 14-8V9.7l-14-8zm0 3.5 10.9 6.2v9.2L16 26.8 5.1 20.6v-9.2L16 5.2zm0 3.6-7.2 4.1v6.2L16 23.2l7.2-4.1v-6.2L16 8.8z" />
      </svg>
    ),
    color: "hover:text-[#0033AD]",
  },
];

export default function SocialFooter() {
  const { t } = useI18n();
  return (
    <div className="w-full max-w-2xl mt-6 mb-2 flex flex-col items-center gap-3">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("followNepp")}</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            title={l.label}
            className={`p-2.5 rounded-xl bg-secondary text-secondary-foreground transition-all hover:bg-accent hover:scale-110 ${l.color}`}
          >
            {l.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
