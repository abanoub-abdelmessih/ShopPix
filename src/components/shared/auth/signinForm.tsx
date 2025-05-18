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
      </form>
    </Form>
  );
};
