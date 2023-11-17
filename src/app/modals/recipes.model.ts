import { RecipeCategoryIntarface } from "./recipe_category.model";

export interface RecipesInterface {
  recipe_id: string;
  recipe_name: string;

  recipe_category_details:Array<RecipeCategoryIntarface>;

  recipe_featured: string;
  action: string;
}
