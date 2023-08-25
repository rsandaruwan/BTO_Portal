import { AttributeIntarface } from "./attributes.model";
import { CategoryInterface } from "./category.model";

export interface SubCategoryHasCategoryIntarface {
    category_details: CategoryInterface;
    attributes_details: Array<AttributeIntarface>;
  
    
  }
  