/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  control: any;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}

export const FormInput = ({
  control,
  id,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
}: FormInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={id}>{label}</FormLabel>
          <FormControl>
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              {...field}
              autoComplete={autoComplete}
            />
          </FormControl>
          <FormMessage className="border p-2 rounded-md shadow" />
        </FormItem>
      )}
    />
  );
};
