import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Heart, Plus, StarIcon } from "lucide-react";

export const ProductCard = ({ product }: { product: ProductType }) => {
  const { price, priceAfterDiscount, title, imageCover } = product;
  const hasDiscount = !!priceAfterDiscount;
  const salePercentage = hasDiscount
    ? Math.round(((price - priceAfterDiscount!) / price) * 100)
    : 0;

  return (
    <div className="dark:bg-white text-white rounded-lg shadow-sm p-2 space-y-2 dark:text-slate-900 font-poppins bg-zinc-900">
      {/* Product Image */}
      <div className="relative h-72 bg-slate-100 rounded-lg shadow-md">
        <Image src={imageCover} alt={title} layout="fill" objectFit="contain" />
        {hasDiscount && (
          <div className="absolute bottom-2 left-2 bg-slate-800 text-white text-2xl font-normal px-3 py-2 rounded shadow-lg">
            - {salePercentage}%
          </div>
        )}
        <button className="absolute top-2 right-1 bg-slate-800 p-2 rounded-full text-white shadow-lg hover:scale-95 duration-300">
          <Heart />
        </button>
      </div>

      {/* Title with Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className="text-2xl line-clamp-2">
              {title.split(" ").slice(0, 3).join(" ")}
            </h3>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white text-sm font-medium">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* Rate */}
      <div className="flex items-center gap-2">
        <StarIcon
          fill="currentColor"
          stroke="currentColor"
          className="text-amber-400"
        />
        <span>{product.ratingsAverage}</span>
        <span className="text-muted text-sm">({product.ratingsQuantity}+)</span>
      </div>

      {/* Price Section */}
      <div className="text-xl font-normal dark:text-slate-900 text-white flex justify-between items-center">
        {hasDiscount ? (
          <div className="space-x-2">
            <span>${priceAfterDiscount}</span>
            <span className="line-through text-gray-400 text-xs">${price}</span>
          </div>
        ) : (
          <span>${price}</span>
        )}
        <button className="dark:bg-zinc-800 bg-zinc-600 text-white p-1 rounded-lg shadow-lg hover:scale-95 duration-300">
          <Plus />
        </button>
      </div>
    </div>
  );
};
