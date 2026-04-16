import { useEffect, useState } from "react";
import MealService from "../services/MealService";
import type { MealDetail } from "../types/types";

interface UseMealSearchResult {
  meals: MealDetail[];
  loading: boolean;
  error: string | null;
}

export function useMealSearch(query: string): UseMealSearchResult {
  const [meals, setMeals] = useState<MealDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setMeals([]);
      return;
    }

    let cancelled = false;

    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await MealService.searchByName(query.trim());
        if (!cancelled) setMeals(data);
      } catch {
        if (!cancelled) setError("Failed to load search results.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMeals();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { meals, loading, error };
}
