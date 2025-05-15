import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import {
  CreateCashOrder,
  CreateCashOrderProps,
  CreateOnlinePaymentOrder,
  CreateOnlinePaymentOrderProps,
} from "@/services/Orders";

// ADD TO CART
export const useCreateCashOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, cartId }: CreateCashOrderProps) =>
      CreateCashOrder({ data, cartId }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Order Created successfully",
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error during create order",
        variant: "destructive",
      });
    },
  });
};

export const useCreateOnlinePaymentOrder = () => {
  return useMutation({
    mutationFn: ({ data, cartId, baseUrl }: CreateOnlinePaymentOrderProps) =>
      CreateOnlinePaymentOrder({ data, cartId, baseUrl }),
    onSuccess: (session) => {
      toast({
        title: "Redirecting",
        description: "You will be redirected to payment gateway",
        className: "bg-green-500",
      });

      if (session?.url) {
        window.location.href = session.url;
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error during online payment order",
        variant: "destructive",
      });
    },
  });
};
