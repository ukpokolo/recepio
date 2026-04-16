import { useEffect, useState } from "react";
import MealService from "../services/MealService";
import type { MealDetail } from "../types/types";

interface UseRandomMealResult {
  meal: MealDetail | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useRandomMeal(): UseRandomMealResult {
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchMeal = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await MealService.getRandom();
        if (!cancelled) setMeal(data);
      } catch {
        if (!cancelled) setError("Failed to load random meal.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMeal();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const refresh = () => setTick((t) => t + 1);

  return { meal, loading, error, refresh };
}
