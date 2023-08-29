export interface EditSubCategoryIntarface {
  sub_category_name: string;

  categories: Array<SubCategoryCategoryIntarface>;
}
export interface SubCategoryCategoryIntarface {
  category_id: string;
  attribute_id: Array<string>;
}
