import { AddressSchema } from "@/schemas/AddressSchema";
import {
  addAddresses,
  GetAddresses,
  RemoveAddresses,
} from "@/services/addresses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { Address } from "@/types/AddressType";

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

  return useMutation({
    mutationFn: (values: AddressSchema) => addAddresses(values),
    onSuccess: (updatedAddresses) => {
      if (updatedAddresses) {
        queryClient.setQueryData(["addresses"], updatedAddresses);
      }

      toast({
        title: "Success",
        description: "Address added successfully",
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error during add address",
        variant: "destructive",
      });
    },
  });
};

// REMOVE ADDRESS
export const useRemoveAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => RemoveAddresses(postId),
    onSuccess: (updatedAddresses) => {
      queryClient.setQueryData(["addresses"], updatedAddresses);
      toast({
        title: "Success",
        description: "Address Removed successfully",
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error during remove address",
        variant: "destructive",
      });
    },
  });
};
