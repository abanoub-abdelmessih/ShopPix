export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartProduct {
  count: number;
  _id: string;
  price: number;
  product: {
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    category: Category;
    brand: null | string;
    ratingsAverage: number;
    id: string;
  };
}

export interface CartData {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
  };
}
