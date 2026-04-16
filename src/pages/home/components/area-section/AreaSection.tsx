import { useNavigate } from "react-router-dom";
import { useAreas } from "../../../../hooks/useAreas";
import { Globe } from "lucide-react";

const areaFlagMap: Record<string, string> = {
  American: "🇺🇸",
  British: "🇬🇧",
  Canadian: "🇨🇦",
  Chinese: "🇨🇳",
  Croatian: "🇭🇷",
  Dutch: "🇳🇱",
  Egyptian: "🇪🇬",
  Filipino: "🇵🇭",
  French: "🇫🇷",
  Greek: "🇬🇷",
  Indian: "🇮🇳",
  Irish: "🇮🇪",
  Italian: "🇮🇹",
  Jamaican: "🇯🇲",
  Japanese: "🇯🇵",
  Kenyan: "🇰🇪",
  Malaysian: "🇲🇾",
  Mexican: "🇲🇽",
  Moroccan: "🇲🇦",
  Polish: "🇵🇱",
  Portuguese: "🇵🇹",
  Russian: "🇷🇺",
  Spanish: "🇪🇸",
  Thai: "🇹🇭",
  Tunisian: "🇹🇳",
  Turkish: "🇹🇷",
  Ukrainian: "🇺🇦",
  Unknown: "🌍",
  Vietnamese: "🇻🇳",
};

/** Number of cuisines to preview on home */
const PREVIEW_COUNT = 12;

export default function AreaSection() {
  const navigate = useNavigate();
  const { areas, loading, error } = useAreas();

  const preview = areas.slice(0, PREVIEW_COUNT);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Globe size={22} style={{ color: "var(--color-primary)" }} />
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            Explore by Cuisine
          </h2>
        </div>
        <button
          onClick={() => navigate("/areas")}
          className="text-sm font-medium transition-colors duration-200 hover:underline cursor-pointer"
          style={{ color: "var(--color-primary)" }}
        >
          View all →
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm" style={{ color: "var(--color-danger)" }}>
          {error}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex flex-col items-center gap-2 rounded-xl p-4"
              style={{ background: "var(--color-bg-card)" }}
            >
              <div
                className="h-10 w-10 rounded-full"
                style={{ background: "var(--color-primary-soft)" }}
              />
              <div
                className="h-3 rounded"
                style={{
                  background: "var(--color-primary-soft)",
                  width: "60%",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {preview.map(({ strArea }) => (
            <button
              key={strArea}
              onClick={() => navigate(`/area/${encodeURIComponent(strArea)}`)}
              className="group flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
              style={{
                background: "var(--color-bg-card)",
                borderColor: "var(--color-border-subtle)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--color-border-subtle)";
              }}
            >
              <span className="text-3xl leading-none">
                {areaFlagMap[strArea] ?? "🌍"}
              </span>
              <span
                className="text-xs font-semibold transition-colors duration-200 group-hover:text-[var(--color-primary)]"
                style={{ color: "var(--color-text-main)" }}
              >
                {strArea}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
