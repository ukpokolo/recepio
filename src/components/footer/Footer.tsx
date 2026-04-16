export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{ background: "var(--background-image-footer)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 sm:h-14 sm:flex-row sm:justify-between sm:gap-0 sm:py-0 sm:px-6">
        {/* ── Left: copyright ── */}
        <p
          className="text-sm text-center sm:text-left"
          style={{ color: "var(--color-text-on-primary)", opacity: 0.9 }}
        >
          © 2026 Recipe App – Powered by TheMealDB API
        </p>

        {/* ── Right: links ── */}
        <nav className="flex items-center gap-4 sm:gap-6">
          {["Terms", "Privacy", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm transition-opacity duration-200 hover:opacity-100"
              style={{
                color: "var(--color-text-on-primary)",
                opacity: 0.85,
              }}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
