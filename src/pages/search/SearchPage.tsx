import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useMealSearch } from "../../hooks/useMealSearch";
import MealCard from "../../components/meal-card/MealCard";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(queryParam);
  const navigate = useNavigate();

  const { meals, loading, error } = useMealSearch(queryParam);

  // Keep input in sync when URL changes
  useEffect(() => {
    setInputValue(queryParam);
  }, [queryParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg-page)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Search bar */}
        <form onSubmit={handleSubmit} className="mb-6 sm:mb-8 flex gap-3">
          <div className="relative flex-1 max-w-xl">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--color-primary)" }}
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search recipes by name..."
              className="h-[46px] w-full rounded-full border py-0 pl-10 pr-4 text-sm outline-none transition-all duration-200"
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
                e.currentTarget.style.borderColor =
                  "var(--color-border-subtle)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
          <button
            type="submit"
            className="rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-text-on-primary)",
            }}
          >
            Search
          </button>
        </form>

        {/* Heading */}
        {queryParam && (
          <div className="mb-6">
            <h1
              className="text-xl sm:text-2xl font-bold"
              style={{ color: "var(--color-text-main)" }}
            >
              {loading
                ? "Searching…"
                : `${meals.length} result${meals.length !== 1 ? "s" : ""} for "${queryParam}"`}
            </h1>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm" style={{ color: "var(--color-danger)" }}>
            {error}
          </p>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl overflow-hidden"
                style={{ background: "var(--color-bg-card)" }}
              >
                <div
                  className="aspect-[4/3] w-full"
                  style={{ background: "var(--color-primary-soft)" }}
                />
                <div className="p-4 flex flex-col gap-2">
                  <div
                    className="h-3 rounded"
                    style={{
                      background: "var(--color-primary-soft)",
                      width: "75%",
                    }}
                  />
                  <div
                    className="h-3 rounded"
                    style={{
                      background: "var(--color-primary-soft)",
                      width: "50%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && !error && meals.length > 0 && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {meals.map((meal) => (
              <MealCard
                key={meal.idMeal}
                id={meal.idMeal}
                title={meal.strMeal}
                imageUrl={meal.strMealThumb}
                tags={
                  meal.strTags
                    ? meal.strTags
                        .split(",")
                        .slice(0, 2)
                        .map((t) => ({ label: t.trim() }))
                    : []
                }
                onClick={(id) => navigate(`/meal/${id}`)}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && queryParam && meals.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <span className="text-5xl">🍽️</span>
            <p
              className="text-lg font-semibold"
              style={{ color: "var(--color-text-main)" }}
            >
              No recipes found for "{queryParam}"
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Try a different name or browse by category.
            </p>
          </div>
        )}

        {/* Idle state */}
        {!queryParam && !loading && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <span className="text-5xl">🔍</span>
            <p
              className="text-lg font-semibold"
              style={{ color: "var(--color-text-main)" }}
            >
              Start typing to search for recipes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
