"use client";

import { useTranslations } from "next-intl";
import { Loader } from "@/components/Loader";
import { useGetAddresses, useRemoveAddress } from "@/hooks/useAddress";
import { Address as AddressType } from "@/types/AddressType";
import { MapPin, Phone, Trash } from "lucide-react";
import { CartDeleteDialog } from "../cart/CartDeleteDialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const Address = ({
  onSelect,
}: {
  onSelect: (address: AddressType) => void;
}) => {
  const t = useTranslations("Checkout.Address");

  const {
    data: AddressData,
    isLoading: loadingAddresses,
    isFetching: fetchingAddresses,
  } = useGetAddresses();
  const { mutate: removingAddresses, isPending: loadingRemoveAddresses } =
    useRemoveAddress();

  if (loadingAddresses || fetchingAddresses) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl flex-1">
        <Loader className="animate-spin" /> {t("pleaseWait")}
      </div>
    );
  }

  if (!AddressData || AddressData.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800 overflow-hidden mb-3">
      <div className="p-4 border-b border-gray-100 dark:border-zinc-800 shadow">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
          {t("savedAddresses")}
        </h2>
      </div>
      <RadioGroup
        className="divide-y divide-gray-100 dark:divide-zinc-800"
        onValueChange={(value) => onSelect(JSON.parse(value))}
      >
        {AddressData.map((address: AddressType) => (
          <div
            key={address._id}
            className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-zinc-800/50 duration-300"
          >
            <RadioGroupItem
              value={JSON.stringify(address)}
              id={address._id}
              className="mr-3"
            />
            <Label htmlFor={address._id} className="flex-1 cursor-pointer">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-md text-xs font-medium uppercase">
                    {address.name}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {address.details}
                    {address.city && (
                      <span className="block text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                        {address.city}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {address.phone}
                  </p>
                </div>
              </div>
            </Label>

            <div>
              <CartDeleteDialog
                description={t("removeAddressConfirmation")}
                isLoading={loadingRemoveAddresses}
                onConfirm={() => removingAddresses(address._id)}
              >
                <button className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  <Trash className="h-4 w-4" />
                </button>
              </CartDeleteDialog>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
