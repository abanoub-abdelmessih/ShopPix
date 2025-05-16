"use client";

import { Button } from "@/components/ui/button";
import { useUpdateProductCount } from "@/hooks/useCart";
import { LoaderPinwheel, Minus, Plus } from "lucide-react";

export const CartQuantity = ({
  quantity: initialQuantity,
  postId,
}: {
  quantity: number;
  postId: string;
}) => {
  const { mutate: updateCount, isPending } = useUpdateProductCount();

  const handleIncrement = () => {
    const newCount = initialQuantity + 1;
    updateCount({ postId, count: newCount.toString() });
  };

  const handleDecrement = () => {
    const newCount = initialQuantity - 1;
    if (newCount >= 1) {
      updateCount({ postId, count: newCount.toString() });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrement}
        disabled={initialQuantity <= 1 || isPending}
        className="h-8 w-8 p-0 rounded-full"
        aria-label="Decrease quantity"
      >
        {isPending ? (
          <LoaderPinwheel className="animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>

      <span className="inline-flex items-center justify-center min-w-[32px] h-6 px-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium">
        {initialQuantity}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={handleIncrement}
        className="h-8 w-8 p-0 rounded-full"
        disabled={isPending}
        aria-label="Increase quantity"
      >
        {isPending ? (
          <LoaderPinwheel className="animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
