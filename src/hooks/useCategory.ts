import { useEffect, useState } from "react";
import CategoryService from "../services/CategoryService";
import type { Category } from "../types/Category.types";

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await CategoryService.getAll();
        if (!cancelled) setCategories(data);
      } catch {
        if (!cancelled) setError("Failed to load categories.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, []);

  return { categories, loading, error };
}