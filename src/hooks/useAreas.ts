import { useEffect, useState } from "react";
import MealService from "../services/MealService";
import type { Area } from "../types/types";

interface UseAreasResult {
  areas: Area[];
  loading: boolean;
  error: string | null;
}

export function useAreas(): UseAreasResult {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAreas = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await MealService.listAreas();
        if (!cancelled) setAreas(data);
      } catch {
        if (!cancelled) setError("Failed to load cuisines.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAreas();
    return () => {
      cancelled = true;
    };
  }, []);

  return { areas, loading, error };
}
