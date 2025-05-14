"use client";
import { Heading } from "@/components/Heading";
import { CheckoutAddress } from "@/components/shared/checkout/CheckoutAddress";
import { PaymentMethod } from "@/components/shared/checkout/PaymentMethod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Address as AddressType } from "@/types/AddressType";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState<
    "OnlinePayment" | "CashOnDelivery" | null
  >(null);
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    null
  );

  const handlePlaceOrder = () => {
    if (!selectedAddress || !paymentMethod) {
      alert("Please select address and payment method");
      return;
    }

    if (paymentMethod === "CashOnDelivery") {
      // send order directly
      console.log("Placing order with:", selectedAddress, paymentMethod);
    } else {
      // Redirect to payment page or start payment process
      console.log("Redirecting to online payment...");
    }
  };

  return (
    <div className="container mx-auto space-y-3 pb-10">
      <Heading
        title="Secure Checkout"
        description="Provide your address and proceed to payment."
      />

      {/* Address */}
      <CheckoutAddress onSelect={setSelectedAddress} />

      <PaymentMethod onSelect={setPaymentMethod} />

      <Button
        onClick={handlePlaceOrder}
        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white transition-colors w-full"
      >
        Place Order
      </Button>
    </div>
  );
};
export default Checkout;
