"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ChangeMyPasswordProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ChangeMyPassword = ({
  open,
  onOpenChange,
}: ChangeMyPasswordProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Password change data:", data);
    reset();
    onOpenChange(false);
  };

  const newPassword = watch("newPassword");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new one.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentPassword" className="text-right">
              Current
            </Label>
            <div className="col-span-3 flex flex-col gap-1">
              <Input
                id="currentPassword"
                type="password"
                {...register("currentPassword", { required: "Required" })}
              />
              {errors.currentPassword && (
                <span className="text-xs text-red-500">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPassword" className="text-right">
              New
            </Label>
            <div className="col-span-3 flex flex-col gap-1">
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword", {
                  required: "Required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
              />
              {errors.newPassword && (
                <span className="text-xs text-red-500">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmPassword" className="text-right">
              Confirm
            </Label>
            <div className="col-span-3 flex flex-col gap-1">
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Required",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
