import { useState } from "react";
import { Search, ChefHat, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      setMobileOpen(false);
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const closeMenu = () => setMobileOpen(false);

  const searchInput = (id: string) => (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
        style={{ color: "var(--color-primary)" }}
        strokeWidth={2.5}
      />
      <input
        id={id}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
        className="h-[42px] w-full rounded-full border py-0 pl-10 pr-4 text-sm outline-none transition-all duration-200"
        style={{
          borderColor: "var(--color-border-subtle)",
          background: "var(--color-bg-card)",
          color: "var(--color-text-main)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-primary)";
          e.currentTarget.style.boxShadow =
            "0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border-subtle)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] shadow-sm"
      style={{ background: "var(--background-image-header)" }}
    >
      {/* ── Main bar ── */}
      <div className="mx-auto flex h-[64px] max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex flex-shrink-0 items-center gap-2 no-underline"
        >
          <span
            className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] shadow-md transition-all duration-200 group-hover:-rotate-6 group-hover:scale-110"
            style={{
              background: "var(--color-primary)",
              boxShadow:
                "0 2px 8px color-mix(in srgb, var(--color-primary) 40%, transparent)",
            }}
          >
            <ChefHat className="h-5 w-5 text-white" strokeWidth={2} />
          </span>
          <span
            className="text-[1.1rem] font-semibold tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--color-primary)",
            }}
          >
            Recepio
          </span>
        </Link>

        {/* Search — desktop only */}
        <form
          onSubmit={handleSearch}
          className="relative hidden w-full max-w-[500px] md:block"
        >
          {searchInput("nav-search-desktop")}
        </form>

        {/* Desktop nav links */}
        <div className="ml-auto hidden flex-shrink-0 items-center gap-1 md:flex">
          <Link
            to="/"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]"
            style={{ color: "var(--color-text-main)" }}
          >
            Home
          </Link>
          <Link
            to="/areas"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]"
            style={{ color: "var(--color-text-main)" }}
          >
            Cuisines
          </Link>
          <Link
            to="/search"
            className="ml-1 rounded-lg px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-px active:translate-y-0"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-text-on-primary)",
              boxShadow:
                "0 2px 8px color-mix(in srgb, var(--color-primary) 35%, transparent)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-primary-strong)";
              e.currentTarget.style.boxShadow =
                "0 4px 14px color-mix(in srgb, var(--color-primary-strong) 35%, transparent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-primary)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px color-mix(in srgb, var(--color-primary) 35%, transparent)";
            }}
          >
            Browse
          </Link>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="ml-auto flex items-center justify-center rounded-lg p-2 transition-colors duration-200 hover:bg-[var(--color-primary-soft)] md:hidden"
          style={{ color: "var(--color-text-main)" }}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      {mobileOpen && (
        <div
          className="border-t md:hidden"
          style={{
            background: "var(--background-image-header)",
            borderColor: "var(--color-border-subtle)",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3">
            {/* Mobile search */}
            <form onSubmit={handleSearch}>
              {searchInput("nav-search-mobile")}
            </form>

            {/* Mobile nav links */}
            <nav className="flex flex-col">
              {[
                { to: "/", label: "Home" },
                { to: "/areas", label: "Cuisines" },
                { to: "/search", label: "Browse All" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]"
                  style={{ color: "var(--color-text-main)" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
