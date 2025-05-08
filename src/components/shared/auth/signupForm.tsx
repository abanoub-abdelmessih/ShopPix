"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "@/schemas/signupSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { signUpFunction } from "@/services/auth";
import { toast } from "@/hooks/use-toast";
import { Loader } from "@/components/Loader";
import { PasswordField } from "./PasswordField";

export const SignupForm = () => {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
      terms: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signUpFunction,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your account has been created successfully!",
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error during sign-up",
        variant: "destructive",
      });
    },

    retry: false,
  });

  const onSubmit = (values: SignUpSchema) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full px-3 mt-1 pt-3"
      >
        {/* Name Field */}
        <FormInput
          control={form.control}
          label="Name"
          name="name"
          placeholder="Enter your name"
          autoComplete="username"
          id="name"
        />

        {/* Email Field */}
        <FormInput
          control={form.control}
          label="Email"
          name="email"
          placeholder="Enter your email"
          autoComplete="username"
          id="email"
        />

        {/* Phone Field */}
        <FormInput
          control={form.control}
          label="Phone"
          name="phone"
          placeholder="Enter your phone number"
          autoComplete="username"
          id="phone"
        />

        {/* Password Field */}
        <PasswordField
          name="password"
          label="Password"
          placeholder="Enter your password"
          control={form.control}
          id="password"
        />

        {/* Confirm Password Field */}
        <PasswordField
          id="rePassword"
          name="rePassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          control={form.control}
        />

        {/* Terms Field */}
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <>
              <FormItem className="flex gap-2 items-center">
                <FormControl>
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel
                  htmlFor="terms"
                  className="cursor-pointer text-sm font-normal flex gap-1"
                >
                  I agree to the
                  <span className="underline">terms and conditions</span>.
                </FormLabel>
              </FormItem>
              <FormMessage className="border p-2 rounded-md shadow dark:text-red-400 dark:border-gray-300" />
            </>
          )}
        />

        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          {isPending ? (
            <>
              <Loader /> Please Wait
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
};
