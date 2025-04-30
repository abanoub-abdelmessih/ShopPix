import { BrandType } from "./BrandType";
import { CategoriesType, SubCategoryType } from "./categoriesType";

export type ProductType = {
  sold: number;
  images: string[];
  subcategory: SubCategoryType[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: CategoriesType;
  brand: BrandType;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
};
