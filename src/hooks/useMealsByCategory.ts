import { useEffect, useState } from "react";
import MealService from "../services/MealService";
import type { FilteredMeal } from "../types/types";

interface UseMealsByCategoryResult {
  meals: FilteredMeal[];
  loading: boolean;
  error: string | null;
}

export function useMealsByCategory(category: string): UseMealsByCategoryResult {
  const [meals, setMeals] = useState<FilteredMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;

    let cancelled = false;

    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await MealService.filterByCategory(category);
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
  }, [category]);

  return { meals, loading, error };
}
