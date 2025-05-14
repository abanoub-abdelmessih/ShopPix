export type Address = {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};

export type AddressResponse = {
  results: number;
  status: "success" | "fail";
  data: Address[];
};
