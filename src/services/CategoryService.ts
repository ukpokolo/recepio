import Request from "./apiClient"; 
import type { CategoriesResponse, Category } from "../types/Category.types";

const CategoryService = {
  async getAll(): Promise<Category[]> {
    const data = await Request.get<CategoriesResponse>(
      "/categories.php"
    );
    return data.categories;
  },
};

export default CategoryService;