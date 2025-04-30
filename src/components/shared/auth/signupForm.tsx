"use client";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FormInput } from "./FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { signUpFunction } from "@/services/auth";
import { toast } from "@/hooks/use-toast";
import Loading from "@/app/loading";

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    name="password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon className="size-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="size-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="border p-2 rounded-md shadow dark:text-red-400 dark:border-gray-300" />
            </FormItem>
          )}
        />

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="rePassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    {...field}
                    name="rePassword"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2"
                    aria-label={
                      showPassword ? "Hide rePassword" : "Show rePassword"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="size-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="size-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="border p-2 rounded-md shadow dark:text-red-400 dark:border-gray-300" />
            </FormItem>
          )}
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
              <Loading /> Please Wait
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
};
