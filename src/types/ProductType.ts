import { BrandType } from "./BrandType";
import { CategoriesType, SubCategoryType } from "./categoriesType";

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
  subcategory: SubCategoryType[];
  brand: BrandType;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type ProductsResponse = {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    nextPage: number | null;
  };
  data: ProductType[];
};

export type GetAllProductsParams = {
  page?: number;
  limit?: number;
  categoryId?: string;
  brandId?: string;
  sort?: string;
  subcategoryId?: string;
  minPrice?: number;
  maxPrice?: number;
};
