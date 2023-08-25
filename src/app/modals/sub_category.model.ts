import { SubCategoryHasCategoryIntarface } from './sub_category_has_category_details.model';

export interface SubCategoryIntarface {
  sub_category_id: string;
  sub_category_name: string;
  sub_category_has_category_details: Array<SubCategoryHasCategoryIntarface>;
  attribute: Array<string>;
  action: string;
}
