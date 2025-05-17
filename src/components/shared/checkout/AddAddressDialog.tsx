"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { LoaderPinwheel, Plus } from "lucide-react";
import { FormInput } from "../auth/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressSchema } from "@/schemas/AddressSchema";
import { useAddAddress } from "@/hooks/useAddress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export const AddAddressDialog = () => {
  const t = useTranslations("Checkout.AddAddressDialog");

  const form = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "home",
      details: "",
      phone: "",
      city: "",
    },
  });

  const { mutate, isPending, isSuccess } = useAddAddress();
  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit = (value: AddressSchema) => {
    mutate(value);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenDialog(false);
    }
  }, [isSuccess]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="w-full border-b py-5">
          <Plus /> {t("addNewAddress")}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 rounded-lg">
        <DialogHeader>
          <DialogTitle>{t("addNewShippingAddress")}</DialogTitle>
          <DialogDescription>{t("enterAddressDetails")}</DialogDescription>
        </DialogHeader>
        <div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label className="mb-3 block">{t("addressType")}</Label>
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 border p-2.5 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="home" id="home" />
                        <Label htmlFor="home">{t("home")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="office" id="office" />
                        <Label htmlFor="office">{t("office")}</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              <FormInput
                control={form.control}
                label={t("details")}
                name="details"
                placeholder={t("detailsPlaceholder")}
                autoComplete="details"
                id="details"
              />

              <FormInput
                type="tel"
                control={form.control}
                label={t("phone")}
                name="phone"
                placeholder={t("phonePlaceholder")}
                autoComplete="phone"
                id="phone"
              />

              <FormInput
                control={form.control}
                label={t("city")}
                name="city"
                placeholder={t("cityPlaceholder")}
                autoComplete="city"
                id="city"
              />

              <DialogFooter>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <LoaderPinwheel className="animate-spin" />
                  ) : (
                    t("saveAddress")
                  )}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};
