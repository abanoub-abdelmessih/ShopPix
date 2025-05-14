import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const PaymentMethod = ({
  onSelect,
}: {
  onSelect: (value: "OnlinePayment" | "CashOnDelivery") => void;
}) => {
  return (
    <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800 overflow-hidden mb-3">
      <div className="p-4 border-b border-gray-100 dark:border-zinc-800 shadow">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
          Payment Method
        </h2>
      </div>
      <RadioGroup
        onValueChange={onSelect}
        className="border p-4 rounded-lg space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="OnlinePayment" id="OnlinePayment" />
          <Label htmlFor="OnlinePayment">Online Payment</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="CashOnDelivery" id="CashOnDelivery" />
          <Label htmlFor="CashOnDelivery">Cash On Delivery</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
