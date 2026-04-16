import { useParams, useNavigate } from "react-router-dom";
import { useMealDetail } from "../../hooks/useMealDetail";
import BackButton from "../../components/back-button/BackButton";
import { Video, ExternalLink, Clock, MapPin, Tag } from "lucide-react";

/** Extract ingredients + measurements from a meal detail object */
function getIngredients(meal: Record<string, string | null>) {
  const list: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() ?? "",
      });
    }
  }
  return list;
}

/** Convert a YouTube watch URL to embed URL */
function getYoutubeEmbed(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function MealDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { meal, loading, error } = useMealDetail(id);

  if (loading) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "var(--color-bg-page)" }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
          <div
            className="mb-6 h-5 w-24 animate-pulse rounded"
            style={{ background: "var(--color-primary-soft)" }}
          />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div
              className="animate-pulse aspect-square w-full rounded-2xl"
              style={{ background: "var(--color-primary-soft)" }}
            />
            <div className="flex flex-col gap-4">
              <div
                className="h-8 w-3/4 animate-pulse rounded"
                style={{ background: "var(--color-primary-soft)" }}
              />
              <div
                className="h-4 w-1/2 animate-pulse rounded"
                style={{ background: "var(--color-primary-soft)" }}
              />
              <div
                className="h-4 w-1/3 animate-pulse rounded"
                style={{ background: "var(--color-primary-soft)" }}
              />
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 animate-pulse rounded"
                  style={{
                    background: "var(--color-primary-soft)",
                    width: `${60 + (i % 3) * 10}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--color-bg-page)" }}
      >
        <div className="text-center">
          <p
            className="mb-4 text-lg font-semibold"
            style={{ color: "var(--color-text-main)" }}
          >
            {error ?? "Meal not found."}
          </p>
          <BackButton onClick={() => navigate(-1)} />
        </div>
      </div>
    );
  }

  const ingredients = getIngredients(meal);
  const embedUrl = getYoutubeEmbed(meal.strYoutube);
  const tags = meal.strTags
    ? meal.strTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg-page)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Back */}
        <BackButton onClick={() => navigate(-1)} className="mb-8" />

        {/* Top grid: image + meta */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 mb-12">
          {/* Image */}
          <div
            className="relative overflow-hidden rounded-2xl shadow-lg"
            style={{ border: "1px solid var(--color-border-subtle)" }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full object-cover"
            />
          </div>

          {/* Meta */}
          <div className="flex flex-col gap-5">
            <h1
              className="text-2xl sm:text-3xl font-extrabold leading-tight"
              style={{ color: "var(--color-text-main)" }}
            >
              {meal.strMeal}
            </h1>

            {/* Category + Area + Tags */}
            <div className="flex flex-wrap gap-2">
              {meal.strCategory && (
                <button
                  onClick={() =>
                    navigate(
                      `/category/${encodeURIComponent(meal.strCategory)}`,
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 hover:opacity-80 cursor-pointer"
                  style={{
                    background: "var(--color-primary-soft)",
                    color: "var(--color-primary)",
                    border: "1px solid var(--color-border-strong)",
                  }}
                >
                  <Clock size={11} />
                  {meal.strCategory}
                </button>
              )}
              {meal.strArea && (
                <button
                  onClick={() =>
                    navigate(`/area/${encodeURIComponent(meal.strArea)}`)
                  }
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 hover:opacity-80 cursor-pointer"
                  style={{
                    background: "var(--color-bg-elevated)",
                    color: "var(--color-text-muted)",
                    border: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <MapPin size={11} />
                  {meal.strArea}
                </button>
              )}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    background: "var(--color-bg-elevated)",
                    color: "var(--color-text-muted)",
                    border: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Ingredients list */}
            <div>
              <h2
                className="mb-3 text-lg font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                Ingredients
              </h2>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {ingredients.map(({ ingredient, measure }) => (
                  <li
                    key={ingredient}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
                    style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border-subtle)",
                    }}
                  >
                    <img
                      src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient)}-small.png`}
                      alt={ingredient}
                      className="h-8 w-8 rounded-md object-contain flex-shrink-0"
                      style={{ background: "var(--color-primary-soft)" }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span
                      className="flex-1 font-medium"
                      style={{ color: "var(--color-text-main)" }}
                    >
                      {ingredient}
                    </span>
                    {measure && (
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {measure}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* External links */}
            <div className="flex flex-wrap gap-3 mt-auto pt-2">
              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-px hover:opacity-90"
                  style={{
                    background: "#ff0000",
                    color: "#ffffff",
                  }}
                >
                  <Video size={15} />
                  Watch on YouTube
                </a>
              )}
              {meal.strSource && (
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                  style={{
                    borderColor: "var(--color-border-strong)",
                    color: "var(--color-primary)",
                    background: "var(--color-bg-card)",
                  }}
                >
                  <ExternalLink size={13} />
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <section className="mb-8 sm:mb-12">
          <h2
            className="mb-4 sm:mb-5 text-xl sm:text-2xl font-bold"
            style={{ color: "var(--color-text-main)" }}
          >
            Instructions
          </h2>
          <div
            className="rounded-2xl p-6 leading-relaxed text-sm whitespace-pre-line"
            style={{
              background: "var(--color-bg-card)",
              color: "var(--color-text-main)",
              border: "1px solid var(--color-border-subtle)",
              lineHeight: "1.85",
            }}
          >
            {meal.strInstructions}
          </div>
        </section>

        {/* YouTube embed */}
        {embedUrl && (
          <section className="mb-8 sm:mb-12">
            <h2
              className="mb-4 sm:mb-5 text-xl sm:text-2xl font-bold"
              style={{ color: "var(--color-text-main)" }}
            >
              Video Tutorial
            </h2>
            <div
              className="overflow-hidden rounded-2xl shadow-md"
              style={{
                aspectRatio: "16/9",
                border: "1px solid var(--color-border-subtle)",
              }}
            >
              <iframe
                src={embedUrl}
                title={`${meal.strMeal} video tutorial`}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
