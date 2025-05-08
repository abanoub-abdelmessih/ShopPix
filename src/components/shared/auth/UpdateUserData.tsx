"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import {
  UpdateUserDataSchema,
  updateUserDataSchema,
} from "@/schemas/UpdateUserDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UpdateUserDataFunction } from "@/services/auth";
import { FormInput } from "./FormInput";
import { Input } from "@/components/ui/input";

type UpdateUserDataProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UpdateUserData = ({ open, onOpenChange }: UpdateUserDataProps) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const userStorage = Cookies.get("user");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  const form = useForm<UpdateUserDataSchema>({
    resolver: zodResolver(updateUserDataSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name });
    }
  }, [user, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateUserDataFunction,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have updated your data successfully!",
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error updating data",
        variant: "destructive",
      });
    },
    retry: false,
  });

  const onSubmit = (value: UpdateUserDataSchema) => {
    mutate(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 rounded-lg">
        <DialogHeader>
          <DialogTitle>Update Profile Information</DialogTitle>
          <DialogDescription>
            Update your name, email address, and phone number below.
          </DialogDescription>
        </DialogHeader>

        {!user ? (
          <div className="text-center py-6">
            <Loader />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                control={form.control}
                label="Name"
                name="name"
                placeholder="Enter your name"
                autoComplete="username"
                id="name"
              />

              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    readOnly
                    disabled
                  />
                </FormControl>
              </FormItem>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader /> Please Wait
                  </>
                ) : (
                  "Update Name"
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
