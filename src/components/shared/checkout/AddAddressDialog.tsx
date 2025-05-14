"use client";
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
        <Button className="w-full border-b py-5" variant="ghost">
          <Plus /> Add New Address
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 rounded-lg">
        <DialogHeader>
          <DialogTitle>Add a New Shipping Address</DialogTitle>
          <DialogDescription>
            Enter your address details for delivery.
          </DialogDescription>
        </DialogHeader>
        <div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label className="mb-3 block">Address Type</Label>
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
                        <Label htmlFor="home">Home</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="office" id="office" />
                        <Label htmlFor="office">Office</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              {/* details */}
              <FormInput
                control={form.control}
                label="Details"
                name="details"
                placeholder="Enter your details"
                autoComplete="details"
                id="details"
              />
              {/* phone */}
              <FormInput
                type="tel"
                control={form.control}
                label="Phone"
                name="phone"
                placeholder="Enter your phone"
                autoComplete="phone"
                id="phone"
              />
              {/* city */}
              <FormInput
                control={form.control}
                label="City"
                name="city"
                placeholder="Enter your city"
                autoComplete="city"
                id="city"
              />

              <DialogFooter>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <LoaderPinwheel className="animate-spin" />
                  ) : (
                    <>Save Address</>
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
