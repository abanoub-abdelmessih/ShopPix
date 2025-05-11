import { ProductType } from "./ProductType";

export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: ProductType;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  totalCartPrice: number;
  numOfCartItems: number;
}
