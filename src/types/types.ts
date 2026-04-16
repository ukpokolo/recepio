// ── Filtered Meal (from filter endpoints) ───────────────────────────────────
export interface FilteredMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface FilteredMealsResponse {
  meals: FilteredMeal[] | null;
}

// ── Full Meal Detail ─────────────────────────────────────────────────────────
export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  // Dynamic ingredient/measure keys (strIngredient1..20, strMeasure1..20)
  [key: string]: string | null;
}

export interface MealsDetailResponse {
  meals: MealDetail[] | null;
}

// ── Area ─────────────────────────────────────────────────────────────────────
export interface Area {
  strArea: string;
}

export interface AreasResponse {
  meals: Area[];
}

// ── Ingredient (list) ────────────────────────────────────────────────────────
export interface IngredientItem {
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

export interface IngredientsListResponse {
  meals: IngredientItem[];
}
