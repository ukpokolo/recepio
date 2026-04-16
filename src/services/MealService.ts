import Request from "./apiClient";
import type {
  FilteredMeal,
  FilteredMealsResponse,
  MealDetail,
  MealsDetailResponse,
  Area,
  AreasResponse,
} from "../types/types";

const MealService = {
  /** Search meals by name */
  async searchByName(name: string): Promise<MealDetail[]> {
    const data = await Request.get<MealsDetailResponse>(
      `/search.php?s=${encodeURIComponent(name)}`,
    );
    return data.meals ?? [];
  },

  /** Search meals by first letter */
  async searchByLetter(letter: string): Promise<MealDetail[]> {
    const data = await Request.get<MealsDetailResponse>(
      `/search.php?f=${encodeURIComponent(letter)}`,
    );
    return data.meals ?? [];
  },

  /** Lookup full meal detail by id */
  async getById(id: string): Promise<MealDetail | null> {
    const data = await Request.get<MealsDetailResponse>(
      `/lookup.php?i=${encodeURIComponent(id)}`,
    );
    return data.meals?.[0] ?? null;
  },

  /** Get a single random meal */
  async getRandom(): Promise<MealDetail | null> {
    const data = await Request.get<MealsDetailResponse>("/random.php");
    return data.meals?.[0] ?? null;
  },

  /** Filter meals by category (returns limited fields) */
  async filterByCategory(category: string): Promise<FilteredMeal[]> {
    const data = await Request.get<FilteredMealsResponse>(
      `/filter.php?c=${encodeURIComponent(category)}`,
    );
    return data.meals ?? [];
  },

  /** Filter meals by area (returns limited fields) */
  async filterByArea(area: string): Promise<FilteredMeal[]> {
    const data = await Request.get<FilteredMealsResponse>(
      `/filter.php?a=${encodeURIComponent(area)}`,
    );
    return data.meals ?? [];
  },

  /** Filter meals by main ingredient (returns limited fields) */
  async filterByIngredient(ingredient: string): Promise<FilteredMeal[]> {
    const data = await Request.get<FilteredMealsResponse>(
      `/filter.php?i=${encodeURIComponent(ingredient)}`,
    );
    return data.meals ?? [];
  },

  /** List all areas/cuisines */
  async listAreas(): Promise<Area[]> {
    const data = await Request.get<AreasResponse>("/list.php?a=list");
    return data.meals ?? [];
  },
};

export default MealService;
