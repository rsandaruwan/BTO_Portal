import { IngredientIntarface } from "./ingredient.model";
import { SubCategoryIntarface } from "./sub_category.model";



export interface ProductsInterface {
  product_id: string;
  vaproduct_variant_name: string
  product_name: string;
  category: string;
  product_rating: string;
  product_in_stock:string
  action: string;
  category_has_sub_category_id: Array<SubCategoryIntarface>;
  product_main_image: string;
  product_description: string;
  product_ingredients: Array<IngredientIntarface>;
  product_featured: 2,
  product_status: 1
}

