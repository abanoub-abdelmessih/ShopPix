import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, LoaderPinwheel, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { RenderStars } from "./RenderStars";
import { useAddWishlist, useRemoveWishlist } from "@/hooks/useWishlist";

export const ProductCard = ({
  product,
  className,
  isWished = false,
}: {
  product: ProductType;
  className?: string;
  isWished?: boolean;
}) => {
  const { price, priceAfterDiscount, title, imageCover } = product;
  const hasDiscount = !!priceAfterDiscount;
  const salePercentage = hasDiscount
    ? Math.round(((price - priceAfterDiscount!) / price) * 100)
    : 0;

  const router = useRouter();
  const { mutate: addToWishList, isPending: loadingAdd } = useAddWishlist();
  const { mutate: removeFromWishList, isPending: loadingRemove } =
    useRemoveWishlist();

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWished) {
      removeFromWishList(product._id);
    } else {
      addToWishList(product._id);
    }
  };

  const handleProductClick = () => {
    router.push(`/products/${product._id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className={cn(
        "bg-white dark:bg-zinc-800 h-fit w-full rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg font-poppins cursor-pointer",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative h-64 bg-gray-50 dark:bg-zinc-700 overflow-hidden">
        <Image
          src={imageCover}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />

        {/* Discount Tag */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-medium px-2 py-1 rounded-full">
            {salePercentage}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all duration-200"
          onClick={toggleWishlist}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
        >
          {loadingAdd || loadingRemove ? (
            <LoaderPinwheel className="animate-spin" />
          ) : (
            <Heart
              className={cn(
                "w-5 h-5 transition-colors",
                isWished
                  ? "text-red-500 fill-red-500"
                  : "text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
              )}
            />
          )}
        </button>
      </div>

      <div className="p-4 space-y-3">
        {/* Title with Tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 truncate">
                {title.split(" ").slice(0, 3).join(" ")}
              </h3>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-800 text-white text-sm p-2 rounded-md">
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400 h-10">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <RenderStars rating={product.ratingsAverage} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {product.ratingsAverage}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            ({product.ratingsQuantity})
          </span>
        </div>

        {/* Price and Add Button */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-1">
            {hasDiscount ? (
              <>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${priceAfterDiscount}
                </span>
                <span className="line-through text-xs text-gray-400">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                ${price}
              </span>
            )}
          </div>

          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label="Add to cart"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
