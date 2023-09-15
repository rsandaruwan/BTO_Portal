import { ProductImageInterface } from "./product_image.model";
import { VarientNutritionIntarface } from "./product_variant_nutrition_list.model";

export interface VarientIntarface {
    product_variant_id: string;
    product_variant_name: string;
    product_images: Array<ProductImageInterface>;
    product_price:string;
    product_attribute_list:Array<VarientNutritionIntarface>
  }

  

 