import { useEffect, useRef, useState } from "react";
import type { AppearanceMode } from "./useAppearance";

const destinations = [
  ["Overview", "#overview"],
  ["Layers", "#foundations"],
  ["Components", "#components"],
  ["Patterns", "#patterns"],
  ["Examples", "#examples"],
] as const;

const searchDestinations = [
  ...destinations,
  ["Specimen sheet", "#specimen"],
  ["Design principles", "#principles"],
  ["Appearance", "#appearance"],
] as const;

interface SiteNavigationProps {
  mode: AppearanceMode;
  resolvedMode: "light" | "dark";
  onModeChange: (mode: AppearanceMode) => void;
}

export function SiteNavigation({ mode, resolvedMode, onModeChange }: SiteNavigationProps) {
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || "#overview");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash || "#overview");
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setAppearanceOpen(false);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAppearanceOpen(false);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("hashchange", updateHash);
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      window.removeEventListener("hashchange", updateHash);
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  const chooseMode = (nextMode: AppearanceMode) => {
    onModeChange(nextMode);
    setAppearanceOpen(false);
  };
  const closeNavigation = () => setMobileOpen(false);
  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };
  const filteredDestinations = searchDestinations.filter(([label]) => label.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <header className="site-nav" ref={headerRef}>
      <a className="wordmark" href="#overview">@NEZHA/UI</a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {destinations.map(([label, href]) => (
          <a key={href} href={href} aria-current={currentHash === href ? "location" : undefined}>{label}</a>
        ))}
      </nav>
      <div className="desktop-actions">
        <button type="button" className="search-action" aria-expanded={searchOpen} aria-controls="site-search" onClick={() => { setSearchOpen((open) => !open); setAppearanceOpen(false); }}>Search</button>
        <div className="appearance-control">
          <button type="button" className="mode-trigger" aria-haspopup="menu" aria-expanded={appearanceOpen} onClick={() => setAppearanceOpen((open) => !open)}>
            Mode: {mode === "system" ? "System" : resolvedMode}
          </button>
          {appearanceOpen ? <AppearanceMenu mode={mode} onSelect={chooseMode} /> : null}
        </div>
      </div>
      <button type="button" className="menu-trigger" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((open) => !open)}>
        {mobileOpen ? "Close" : "Menu"}
      </button>
      {mobileOpen ? (
        <div className="mobile-menu" id="mobile-navigation">
          <div className="mobile-menu-title">Nezha UI</div>
          <nav aria-label="Mobile navigation">
            {destinations.map(([label, href]) => <a key={href} href={href} aria-current={currentHash === href ? "location" : undefined} onClick={closeNavigation}>{label}</a>)}
          </nav>
          <div className="mobile-menu-group"><button type="button" className="mobile-search-action" onClick={() => { setSearchOpen(true); setMobileOpen(false); }}>Search</button></div>
          <div className="mobile-menu-group">
            <span>Appearance</span>
            <div className="mobile-modes">{(["light", "dark", "system"] as AppearanceMode[]).map((item) => <button key={item} type="button" aria-pressed={mode === item} onClick={() => onModeChange(item)}>{item}</button>)}</div>
          </div>
          <div className="mobile-version"><span>Version</span><strong>0.1</strong></div>
        </div>
      ) : null}
      {searchOpen ? (
        <div className="search-panel" id="site-search" role="dialog" aria-labelledby="search-title">
          <div className="search-panel-head"><strong id="search-title">Search catalogue</strong><button type="button" onClick={closeSearch}>Close</button></div>
          <label htmlFor="catalogue-search">Find a section</label>
          <input id="catalogue-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Components, patterns, appearance…" autoFocus />
          <nav aria-label="Search results">
            {filteredDestinations.map(([label, href]) => <a key={href} href={href} onClick={closeSearch}><span>{label}</span><small>{href}</small></a>)}
            {filteredDestinations.length === 0 ? <p>No matching sections.</p> : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function AppearanceMenu({ mode, onSelect }: { mode: AppearanceMode; onSelect: (mode: AppearanceMode) => void }) {
  return (
    <div className="appearance-menu" role="menu" aria-label="Appearance">
      <span>Appearance</span>
      {(["light", "dark", "system"] as AppearanceMode[]).map((item) => (
        <button key={item} type="button" role="menuitemradio" aria-checked={mode === item} onClick={() => onSelect(item)}>{item}</button>
      ))}
    </div>
  );
}
