export interface CategoriesType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export interface SubCategoryType {
  _id: string;
  name: string;
  slug: string;
  category: CategoriesType;
}
