import { useEffect, useState } from "react";
import MealService from "../services/MealService";
import type { FilteredMeal } from "../types/types";

interface UseMealsByAreaResult {
  meals: FilteredMeal[];
  loading: boolean;
  error: string | null;
}

export function useMealsByArea(area: string): UseMealsByAreaResult {
  const [meals, setMeals] = useState<FilteredMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!area) return;

    let cancelled = false;

    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await MealService.filterByArea(area);
        if (!cancelled) setMeals(data);
      } catch {
        if (!cancelled) setError("Failed to load meals.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMeals();
    return () => {
      cancelled = true;
    };
  }, [area]);

  return { meals, loading, error };
}
