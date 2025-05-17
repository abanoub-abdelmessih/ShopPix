"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoaderPinwheel } from "lucide-react";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

interface DeleteDialogProps {
  children: ReactNode;
  description: string;
  isLoading: boolean;
  onConfirm: () => void;
}

export const CartDeleteDialog = ({
  children,
  description,
  isLoading,
  onConfirm,
}: DeleteDialogProps) => {
  const t = useTranslations("CartDeleteDialog");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-11/12 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("DescriptionPrefix")} {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-500 duration-300"
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading ? <LoaderPinwheel /> : t("Confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
