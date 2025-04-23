"use client";

import { Form, FormField, FormMessage } from "@/components/ui/form";
import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  EmailSchema,
  NewPasswordSchema,
  ResetCodeSchema,
} from "@/schemas/ForgotPasswordSchema";
import {
  ResetPasswordFunction,
  SendResetCodeFunction,
  VerifyResetCodeFunction,
} from "@/services/auth";

export const SendResetCode = ({ onSuccess }: { onSuccess: () => void }) => {
  const emailFromCookie = Cookies.get("email") || "";
  const emailForm = useForm<EmailSchema>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: emailFromCookie,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: SendResetCodeFunction,
    onSuccess: (response) => {
      toast({
        title: "Success",
        description: response.message,
        className: "bg-green-500",
      });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: EmailSchema) => {
    mutate(values);
  };

  return (
    <Form {...emailForm}>
      <form onSubmit={emailForm.handleSubmit(onSubmit)}>
        <FormInput
          control={emailForm.control}
          label="Email"
          name="email"
          placeholder="Enter your email"
          id="email"
        />
        <Button type="submit" className="w-full mt-5" disabled={isPending}>
          {isPending ? <Loader /> : "Send Code"}
        </Button>
      </form>
    </Form>
  );
};

export const VerifyResetCode = ({ onSuccess }: { onSuccess: () => void }) => {
  const codeForm = useForm<ResetCodeSchema>({
    resolver: zodResolver(ResetCodeSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: VerifyResetCodeFunction,
    onSuccess: () => {
      toast({
        title: "Code Verified",
        description:
          "The reset code is correct. You can now set a new password.",
        className: "bg-green-500",
      });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: ResetCodeSchema) => {
    mutate(values);
  };

  return (
    <Form {...codeForm}>
      <form
        onSubmit={codeForm.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center mt-3"
      >
        <FormField
          control={codeForm.control}
          name="resetCode"
          render={({ field }) => (
            <>
              <InputOTP maxLength={6} minLength={5} {...field} autoFocus>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-12" />
                  <InputOTPSlot index={1} className="size-12" />
                  <InputOTPSlot index={2} className="size-12" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="size-12" />
                  <InputOTPSlot index={4} className="size-12" />
                  <InputOTPSlot index={5} className="size-12" />
                </InputOTPGroup>
              </InputOTP>
              <FormMessage className="border p-2 rounded-md shadow my-3 w-full" />
            </>
          )}
        />

        <p className="text-sm text-muted-foreground my-3">
          Please enter the 5 or 6-digit code sent to your email.
        </p>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader /> : "Verify Code"}
        </Button>
      </form>
    </Form>
  );
};

export const ResetPassword = () => {
  const emailFromCookie = Cookies.get("email") || "";
  const newPasswordForm = useForm<NewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      email: emailFromCookie,
      newPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ResetPasswordFunction,
    onSuccess: () => {
      toast({
        title: "Password Reset Successful",
        description:
          "Your password has been successfully reset. You can now log in with your new password.",
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: NewPasswordSchema) => {
    mutate(values);
  };

  return (
    <Form {...newPasswordForm}>
      <form onSubmit={newPasswordForm.handleSubmit(onSubmit)}>
        <FormInput
          control={newPasswordForm.control}
          label="New Password"
          name="newPassword"
          placeholder="Enter your new password."
          id="newPassword"
        />
        <Button type="submit" className="w-full mt-5" disabled={isPending}>
          {isPending ? <Loader /> : "Send Code"}
        </Button>
      </form>
    </Form>
  );
};
