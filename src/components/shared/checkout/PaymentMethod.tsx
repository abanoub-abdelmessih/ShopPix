import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Banknote, CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";

export const PaymentMethod = ({
  onSelect,
}: {
  onSelect: (value: "OnlinePayment" | "CashOnDelivery") => void;
}) => {
  const t = useTranslations("Checkout.PaymentMethod");

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800 overflow-hidden mb-3">
      <div className="p-4 border-b border-gray-100 dark:border-zinc-800 shadow">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
          {t("paymentMethod")}
        </h2>
      </div>
      <RadioGroup
        onValueChange={onSelect}
        className="border p-4 rounded-lg space-y-2"
      >
        <div className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-zinc-800/50 duration-300 p-3 cursor-pointer rounded-lg">
          <RadioGroupItem value="OnlinePayment" id="OnlinePayment" />
          <Label
            htmlFor="OnlinePayment"
            className="w-full flex gap-1 items-center cursor-pointer"
          >
            <CreditCard className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
            {t("onlinePayment")}
          </Label>
        </div>
        <div className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-zinc-800/50 duration-300 p-3 cursor-pointer rounded-lg">
          <RadioGroupItem value="CashOnDelivery" id="CashOnDelivery" />
          <Label
            htmlFor="CashOnDelivery"
            className="w-full flex gap-1 items-center cursor-pointer"
          >
            <Banknote className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
            {t("cashOnDelivery")}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
