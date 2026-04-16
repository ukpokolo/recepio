import { useNavigate } from "react-router-dom";
import { useRandomMeal } from "../../../../hooks/useRandomMeal";
import { Shuffle, ChevronRight } from "lucide-react";

export default function RandomMealSection() {
  const navigate = useNavigate();
  const { meal, loading, refresh } = useRandomMeal();

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        <div
          className="animate-pulse rounded-2xl overflow-hidden flex flex-col md:flex-row gap-0"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border-subtle)",
          }}
        >
          <div
            className="w-full md:w-72 h-48 md:h-auto flex-shrink-0"
            style={{ background: "var(--color-primary-soft)" }}
          />
          <div className="flex flex-col gap-4 p-6 flex-1">
            <div
              className="h-5 rounded"
              style={{ background: "var(--color-primary-soft)", width: "40%" }}
            />
            <div
              className="h-7 rounded"
              style={{ background: "var(--color-primary-soft)", width: "65%" }}
            />
            <div
              className="h-3 rounded"
              style={{ background: "var(--color-primary-soft)", width: "30%" }}
            />
          </div>
        </div>
      </section>
    );
  }

  if (!meal) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
      {/* Section header */}
      <div className="mb-6 flex items-center gap-2.5">
        <Shuffle size={22} style={{ color: "var(--color-primary)" }} />
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          Discover a Random Recipe
        </h2>
      </div>

      {/* Card */}
      <div
        className="group relative flex flex-col overflow-hidden rounded-2xl md:flex-row"
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border-subtle)",
          boxShadow:
            "0 2px 12px color-mix(in srgb, var(--color-primary) 8%, transparent)",
        }}
      >
        {/* Image */}
        <div className="relative w-full overflow-hidden md:w-72 md:flex-shrink-0">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-4 p-6 md:p-8">
          <div className="flex flex-col gap-3">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {meal.strCategory && (
                <span
                  className="rounded-full px-3 py-0.5 text-xs font-semibold"
                  style={{
                    background: "var(--color-primary-soft)",
                    color: "var(--color-primary)",
                    border: "1px solid var(--color-border-strong)",
                  }}
                >
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span
                  className="rounded-full px-3 py-0.5 text-xs font-semibold"
                  style={{
                    background: "var(--color-bg-elevated)",
                    color: "var(--color-text-muted)",
                    border: "1px solid var(--color-border-subtle)",
                  }}
                >
                  {meal.strArea}
                </span>
              )}
            </div>

            <h3
              className="text-2xl font-extrabold leading-snug"
              style={{ color: "var(--color-text-main)" }}
            >
              {meal.strMeal}
            </h3>

            <p
              className="text-sm leading-relaxed line-clamp-3"
              style={{ color: "var(--color-text-muted)" }}
            >
              {meal.strInstructions?.slice(0, 180)}…
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate(`/meal/${meal.idMeal}`)}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-px hover:opacity-90"
              style={{
                background: "var(--background-image-footer)",
                color: "var(--color-text-on-primary)",
              }}
            >
              View Recipe
              <ChevronRight size={15} />
            </button>
            <button
              onClick={refresh}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-px cursor-pointer"
              style={{
                borderColor: "var(--color-border-strong)",
                color: "var(--color-primary)",
                background: "var(--color-bg-card)",
              }}
            >
              <Shuffle size={14} />
              Shuffle
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
