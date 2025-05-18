import { AddressSchema } from "@/schemas/AddressSchema";
import {
  addAddresses,
  GetAddresses,
  RemoveAddresses,
} from "@/services/addresses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { Address } from "@/types/AddressType";
import { useTranslations } from "next-intl";

// GET ADDRESSES
export const useGetAddresses = () => {
  return useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: GetAddresses,
    staleTime: 5 * 60 * 1000,
  });
};

// ADD ADDRESS
export const useAddAddress = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("AddressToasts");

  return useMutation({
    mutationFn: (values: AddressSchema) => addAddresses(values),
    onSuccess: (updatedAddresses) => {
      if (updatedAddresses) {
        queryClient.setQueryData(["addresses"], updatedAddresses);
      }

      toast({
        title: t("success"),
        description: t("addressAddedSuccessfully"),
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("failed"),
        description: error.message || t("errorAddingAddress"),
        variant: "destructive",
      });
    },
  });
};

// REMOVE ADDRESS
export const useRemoveAddress = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("AddressToasts");

  return useMutation({
    mutationFn: (postId: string) => RemoveAddresses(postId),
    onSuccess: (updatedAddresses) => {
      queryClient.setQueryData(["addresses"], updatedAddresses);
      toast({
        title: t("success"),
        description: t("addressRemovedSuccessfully"),
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("failed"),
        description: error.message || t("errorRemovingAddress"),
        variant: "destructive",
      });
    },
  });
};
