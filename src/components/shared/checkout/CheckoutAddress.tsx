import { AddAddressDialog } from "./AddAddressDialog";
import { Address } from "./Address";
import { Address as AddressType } from "@/types/AddressType";

export const CheckoutAddress = ({
  onSelect,
}: {
  onSelect: (address: AddressType) => void;
}) => {
  return (
    <>
      <Address onSelect={onSelect} />
      <AddAddressDialog />
    </>
  );
};
