import { SubCategoryIntarface } from "./sub_category.model";

export interface CategoryInterface {
  c_id: string;
  c_name: string;
  sub_category:  Array<SubCategoryIntarface>,
  action: string;
}
