"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, Sun, Moon, Languages, X } from "lucide-react";
import { useStoredValue, setStoredValue } from "@/lib/storage";
const links = [
  ["/timeline", "Timeline", "Linimasa"],
  ["/evolution", "Evolution", "Evolusi"],
  ["/migration", "Atlas", "Atlas"],
  ["/cultures", "Cultures", "Budaya"],
  ["/behavior", "Behavior", "Perilaku"],
  ["/compare", "Compare", "Bandingkan"],
  ["/library", "Library", "Perpustakaan"],
  ["/learn", "Learn", "Belajar"],
];
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const theme = useStoredValue("anthro-theme", "dark");
  const lang = useStoredValue("anthro-lang", "en");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
  }, [theme, lang]);
  function toggleTheme() {
    setStoredValue("anthro-theme", theme === "dark" ? "light" : "dark");
  }
  function toggleLang() {
    setStoredValue("anthro-lang", lang === "en" ? "id" : "en");
  }
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link
            className="brand"
            href="/"
            prefetch={false}
            aria-label="Anthroverse home"
          >
            <span className="brand-mark">✦</span>ANTHROVERSE
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            {links.map(([href, en, id]) => (
              <Link
                className={pathname.startsWith(href) ? "active" : ""}
                href={href}
                prefetch={false}
                key={href}
              >
                {lang === "id" ? id : en}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="icon-btn"
              href="/search"
              prefetch={false}
              aria-label={
                lang === "id" ? "Cari di museum" : "Search the museum"
              }
            >
              <Search size={18} />
            </Link>
            <button
              className="icon-btn"
              onClick={toggleLang}
              aria-label="Toggle Indonesian and English interface"
              title={
                lang === "en"
                  ? "Switch interface to Indonesian"
                  : "Switch interface to English"
              }
            >
              <Languages size={17} />
              <span className="sr-only">{lang}</span>
            </button>
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="icon-btn menu-btn"
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
              aria-label="Toggle menu"
            >
              {menu ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {links.map(([href, en, id]) => (
              <Link
                href={href}
                prefetch={false}
                key={href}
                onClick={() => setMenu(false)}
              >
                {lang === "id" ? id : en}
              </Link>
            ))}
          </nav>
        )}
        {lang === "id" && (
          <div className="language-notice container">
            Antarmuka tersedia dalam Bahasa Indonesia. Teks riset pameran masih
            berbahasa Inggris.
          </div>
        )}
      </header>
      {children}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand">
                <span className="brand-mark">✦</span>ANTHROVERSE
              </div>
              <p className="muted" style={{ maxWidth: 350, lineHeight: 1.7 }}>
                {lang === "id"
                  ? "Jelajahi manusia lintas waktu. Museum digital berbasis bukti untuk siapa pun yang ingin tahu."
                  : "Explore humanity across time. An evidence-aware digital museum for curious minds."}
              </p>
            </div>
            <div>
              <span className="eyebrow">
                {lang === "id" ? "Jelajahi" : "Explore"}
              </span>
              <Link href="/timeline" prefetch={false}>
                {lang === "id" ? "Waktu purba" : "Deep time"}
              </Link>
              <Link href="/evolution" prefetch={false}>
                {lang === "id" ? "Garis keturunan manusia" : "Human lineages"}
              </Link>
              <Link href="/cultures" prefetch={false}>
                {lang === "id" ? "Budaya" : "Culture"}
              </Link>
              <Link href="/migration" prefetch={false}>
                {lang === "id" ? "Atlas migrasi" : "Migration atlas"}
              </Link>
            </div>
            <div>
              <span className="eyebrow">Museum</span>
              <Link href="/search" prefetch={false}>
                {lang === "id" ? "Cari" : "Search"}
              </Link>
              <Link href="/learn" prefetch={false}>
                {lang === "id" ? "Jalur belajar" : "Learning path"}
              </Link>
              <Link href="/library" prefetch={false}>
                {lang === "id" ? "Peneliti" : "Researchers"}
              </Link>
              <Link href="/sources" prefetch={false}>
                {lang === "id" ? "Sumber & metode" : "Sources & methods"}
              </Link>
            </div>
          </div>
          <div className="footer-note">
            {lang === "id"
              ? "Tanggal riset umumnya perkiraan. Ilustrasi merupakan karya seni, bukan rekonstruksi ilmiah."
              : "Research dates are approximate unless stated otherwise. Interpretive illustrations are artwork, not scientific reconstructions."}{" "}
            © 2026 ANTHROVERSE.
          </div>
        </div>
      </footer>
    </>
  );
}
