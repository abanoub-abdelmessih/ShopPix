import { Heading } from "@/components/Heading";
import { CheckoutAddress } from "@/components/shared/checkout/CheckoutAddress";

const Checkout = () => {
  return (
    <div className="container mx-auto">
      <Heading
        title="Secure Checkout"
        description="Provide your address and proceed to payment."
      />

      {/* Address */}
      <CheckoutAddress />
    </div>
  );
};
export default Checkout;
