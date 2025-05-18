import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import {
  CreateCashOrder,
  CreateCashOrderProps,
  CreateOnlinePaymentOrder,
  CreateOnlinePaymentOrderProps,
  GetAllOrders,
} from "@/services/Orders";
import { useTranslations } from "next-intl";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: GetAllOrders,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateCashOrder = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("OrdersToasts");

  return useMutation({
    mutationFn: ({ data, cartId }: CreateCashOrderProps) =>
      CreateCashOrder({ data, cartId }),
    onSuccess: () => {
      toast({
        title: t("success"),
        description: t("orderCreatedSuccessfully"),
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: Error) => {
      toast({
        title: t("failed"),
        description: error.message || t("errorCreatingOrder"),
        variant: "destructive",
      });
    },
  });
};

export const useCreateOnlinePaymentOrder = () => {
  const t = useTranslations("OrdersToasts");

  return useMutation({
    mutationFn: ({ data, cartId, baseUrl }: CreateOnlinePaymentOrderProps) =>
      CreateOnlinePaymentOrder({ data, cartId, baseUrl }),
    onSuccess: (session) => {
      toast({
        title: t("redirecting"),
        description: t("redirectingToPayment"),
        className: "bg-green-500",
      });

      if (session?.url) {
        window.location.href = session.url;
      }
    },
    onError: (error: Error) => {
      toast({
        title: t("failed"),
        description: error.message || t("errorOnlinePayment"),
        variant: "destructive",
      });
    },
  });
};
