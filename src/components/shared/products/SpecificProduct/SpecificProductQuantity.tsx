import { ProductType } from "@/types/ProductType";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";

export const SpecificProductQuantity = ({
  product,
}: {
  product: ProductType;
}) => {
  const [theQuantity, setTheQuantity] = useState(1);

  return (
    <div className="mb-8">
      <label
        htmlFor="quantity"
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
      >
        Quantity
      </label>
      <div className="inline-flex items-center max-w-[160px] bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm">
        <button
          onClick={() => setTheQuantity(theQuantity - 1)}
          disabled={theQuantity <= 1}
          className="p-2.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-l-full disabled:text-zinc-400 dark:disabled:text-zinc-600 transition-colors"
        >
          <MinusCircle className="w-5 h-5" />
        </button>
        <input
          type="number"
          id="quantity"
          min="1"
          max={product.quantity}
          value={theQuantity}
          readOnly
          className="w-16 text-center border-x border-zinc-200 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white bg-transparent focus:outline-none"
        />
        <button
          onClick={() => setTheQuantity(theQuantity + 1)}
          disabled={theQuantity >= product.quantity}
          className="p-2.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-r-full disabled:text-zinc-400 dark:disabled:text-zinc-600 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
