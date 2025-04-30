export interface CategoriesType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export type SubCategoryType = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};
