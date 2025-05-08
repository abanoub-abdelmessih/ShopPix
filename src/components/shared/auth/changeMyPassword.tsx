"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { PasswordField } from "./PasswordField";
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "@/schemas/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { ChangeMyPasswordFunction } from "@/services/auth";
import { toast } from "@/hooks/use-toast";
import { Loader } from "@/components/Loader";

type ChangeMyPasswordProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ChangeMyPassword = ({
  open,
  onOpenChange,
}: ChangeMyPasswordProps) => {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ChangeMyPasswordFunction,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have changed your password successfully!",
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error changing password",
        variant: "destructive",
      });
    },

    retry: false,
  });

  const onSubmit = (value: ChangePasswordSchema) => {
    mutate(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 rounded-lg">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new one.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              name="username"
              autoComplete="username"
              className="hidden"
            />

            <PasswordField
              id="currentPassword"
              name="currentPassword"
              label="Current Password"
              placeholder="Enter your current password"
              control={form.control}
            />
            <PasswordField
              id="password"
              name="password"
              label="New Password"
              placeholder="Enter your new password"
              control={form.control}
            />
            <PasswordField
              id="rePassword"
              name="rePassword"
              label="Confirm Password"
              placeholder="Re-enter your password"
              control={form.control}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader /> Please Wait
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
