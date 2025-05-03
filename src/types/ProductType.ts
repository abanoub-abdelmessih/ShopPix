import { BrandType } from "./BrandType";
import { CategoriesType } from "./categoriesType";

export type ProductType = {
  sold: number;
  images: string[];
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
