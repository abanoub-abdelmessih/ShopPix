"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInSchema, signInSchema } from "@/schemas/signinSchema";
import { FormInput } from "./FormInput";
import { useMutation } from "@tanstack/react-query";
import { signInFunction } from "@/services/auth";
import { toast } from "@/hooks/use-toast";
import { Loader } from "@/components/Loader";
import { PasswordField } from "./PasswordField";
import { KeyRoundIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const SigninForm = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signInFunction,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have logged in successfully!",
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error during sign-in",
        variant: "destructive",
      });
    },

    retry: false,
  });

  const onSubmit = (values: SignInSchema) => {
    mutate(values);
  };

  const handleQuickLogin = () => {
    mutate({
      email: "abanoubabdelmessih@gmail.com",
      password: "Abanoub@123",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full px-3 mt-1 pt-3"
      >
        {/* Email Field */}
        <FormInput
          control={form.control}
          label="Email"
          name="email"
          placeholder="Enter your email"
          id="email"
        />

        <PasswordField
          name="password"
          label="Password"
          placeholder="Enter your password"
          control={form.control}
          id="password"
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader /> Please Wait
            </>
          ) : (
            "Sign In"
          )}
        </Button>
        <Button variant={"outline"} className="w-full" asChild>
          <Link href={"/forgotPassword"}>Forgot Password ?</Link>
        </Button>

        {/* Quick Login Section */}
        <div
          onClick={isPending ? undefined : handleQuickLogin}
          className={cn(
            "rounded-lg border-2 border-dashed bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-500 p-4",
            isPending
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:scale-[0.98] transition-transform duration-300"
          )}
        >
          <div className="flex items-center gap-3">
            {/* Key Icon */}
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-500 rounded-full flex-shrink-0">
              {isPending ? (
                <Loader className="w-5 h-5 text-white" />
              ) : (
                <KeyRoundIcon className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Quick Login Text */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h6 className="font-semibold text-gray-900 dark:text-gray-100">
                  Quick Demo Access
                </h6>
                <span className="px-2 py-0.5 bg-indigo-500 text-white text-xs font-medium rounded-full">
                  Demo
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                {isPending
                  ? "Signing you in..."
                  : "Try the app with demo credentials"}
              </p>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
