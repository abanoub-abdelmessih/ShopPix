import { CartProduct } from "./CartType";

export interface OrderType {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    details: string;
    phone: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: CartProduct[];
  createdAt: string;
  updatedAt: string;
}
