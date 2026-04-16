import { useParams, useNavigate } from "react-router-dom";
import { useMealsByArea } from "../../hooks/useMealsByArea";
import MealCard from "../../components/meal-card/MealCard";
import BackButton from "../../components/back-button/BackButton";

export default function AreaMealsPage() {
  const { name = "" } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { meals, loading, error } = useMealsByArea(name);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg-page)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Back */}
        <BackButton onClick={() => navigate(-1)} className="mb-6" />

        {/* Heading */}
        <div className="mb-8">
          <h1
            className="text-2xl sm:text-3xl font-extrabold"
            style={{ color: "var(--color-primary)" }}
          >
            {name} Cuisine
          </h1>
          {!loading && (
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {meals.length} recipe{meals.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm" style={{ color: "var(--color-danger)" }}>
            {error}
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl overflow-hidden"
                style={{ background: "var(--color-bg-card)" }}
              >
                <div
                  className="aspect-[4/3] w-full"
                  style={{ background: "var(--color-primary-soft)" }}
                />
                <div className="p-4">
                  <div
                    className="h-3 rounded"
                    style={{
                      background: "var(--color-primary-soft)",
                      width: "70%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {meals.map((meal) => (
              <MealCard
                key={meal.idMeal}
                id={meal.idMeal}
                title={meal.strMeal}
                imageUrl={meal.strMealThumb}
                onClick={(id) => navigate(`/meal/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
