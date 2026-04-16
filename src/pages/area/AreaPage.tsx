import { useNavigate } from "react-router-dom";
import { useAreas } from "../../hooks/useAreas";
import BackButton from "../../components/back-button/BackButton";
import { Globe } from "lucide-react";

// Map area names to flag emoji (best-effort)
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

export default function AreaPage() {
  const navigate = useNavigate();
  const { areas, loading, error } = useAreas();

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg-page)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Back */}
        <BackButton onClick={() => navigate(-1)} className="mb-6" />

        {/* Heading */}
        <div className="mb-8 flex items-center gap-3">
          <Globe size={28} style={{ color: "var(--color-primary)" }} />
          <h1
            className="text-3xl font-extrabold"
            style={{ color: "var(--color-primary)" }}
          >
            Browse by Cuisine
          </h1>
        </div>
        <p
          className="mb-8 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Explore recipes from around the world. Pick a cuisine to get started.
        </p>

        {/* Error */}
        {error && (
          <p className="text-sm" style={{ color: "var(--color-danger)" }}>
            {error}
          </p>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex flex-col items-center gap-3 rounded-2xl p-5"
                style={{ background: "var(--color-bg-card)" }}
              >
                <div
                  className="h-12 w-12 rounded-full"
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {areas.map(({ strArea }) => (
              <button
                key={strArea}
                onClick={() => navigate(`/area/${encodeURIComponent(strArea)}`)}
                className="group flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
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
                <span className="text-4xl leading-none">
                  {areaFlagMap[strArea] ?? "🌍"}
                </span>
                <span
                  className="text-sm font-semibold transition-colors duration-200 group-hover:text-[var(--color-primary)]"
                  style={{ color: "var(--color-text-main)" }}
                >
                  {strArea}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
