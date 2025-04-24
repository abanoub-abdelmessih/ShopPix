"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import Link from "next/link";
import { SignInSchema, signInSchema } from "@/schemas/signinSchema";
import { FormInput } from "./FormInput";
import { useMutation } from "@tanstack/react-query";
import { signInFunction } from "@/services/auth";
import { toast } from "@/hooks/use-toast";
import { Loader } from "@/components/Loader";

export const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);

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
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    name="password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="border p-2 rounded-md shadow" />
            </FormItem>
          )}
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

        <p className="text-gray-500 text-sm text-center">
          Don&apos;t have an account ?
          <Link href={"/sign-up"} className="underline ms-1 text-black">
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};
