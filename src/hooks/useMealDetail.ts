import { useEffect, useState } from "react";
import MealService from "../services/MealService";
import type { MealDetail } from "../types/types";

interface UseMealDetailResult {
  meal: MealDetail | null;
  loading: boolean;
  error: string | null;
}

export function useMealDetail(id: string): UseMealDetailResult {
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchMeal = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await MealService.getById(id);
        if (!cancelled) setMeal(data);
      } catch {
        if (!cancelled) setError("Failed to load meal details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMeal();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { meal, loading, error };
}
