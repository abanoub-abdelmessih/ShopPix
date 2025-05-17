import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CartData } from "@/types/CartType";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { CartActionButtons } from "./CartActionButtons";
import { CartQuantity } from "./CartQuantity";
import { useTranslations } from "next-intl";

interface CartCardProps {
  cartData: CartData;
  wishedIds: string[];
  loadingAdd: boolean;
  loadingRemove: boolean;
  toggleWishlist: (productId: string, e: MouseEvent<HTMLButtonElement>) => void;
}

export const CartCard = ({
  cartData,
  wishedIds,
  loadingAdd,
  loadingRemove,
  toggleWishlist,
}: CartCardProps) => {
  const t = useTranslations("Cart");

  return (
    <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
      {cartData.data.products.map((item) => {
        const isWished = wishedIds.includes(item.product?._id);
        return (
          <Card
            key={item._id}
            className="overflow-hidden border border-gray-200 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <CardHeader className="border-b p-3 bg-indigo-50 dark:bg-zinc-800 flex justify-between flex-row items-center">
              <CardTitle className="text-lg font-medium line-clamp-1 text-gray-900 dark:text-white">
                <Link
                  href={`/products/${item.product?._id}`}
                  className="hover:underline"
                  aria-label={t("ViewProduct")}
                >
                  {(item.product?.title).split(" ").slice(0, 3).join(" ") ||
                    "N/A"}
                </Link>
              </CardTitle>
              <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-medium">
                {item.count}
              </span>
            </CardHeader>

            <CardContent className="p-4">
              <div className="flex flex-row gap-4">
                <div className="flex-shrink-0 relative w-[90px] h-[90px] rounded-md overflow-hidden shadow-sm border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/70">
                  <Image
                    src={item.product?.imageCover || "/placeholder.png"}
                    alt={item.product?.title || t("Product")}
                    fill
                    property="true"
                    className="object-contain"
                    sizes="90px"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100 dark:border-zinc-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {t("Each")}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <CartActionButtons
                        isWished={isWished}
                        item={item}
                        loadingAdd={loadingAdd}
                        loadingRemove={loadingRemove}
                        toggleWishlist={toggleWishlist}
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 h-8 w-8 rounded-full flex items-center justify-center">
                          <span className="text-indigo-800 dark:text-indigo-300 font-semibold">
                            {item.count}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          × {t("Items")}
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
                          {t("TotalLabel")}
                        </div>
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          ${(item.count * item.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="justify-between gap-2 border-t py-3">
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {item.product?.ratingsAverage?.toFixed(1) || "0.0"}
                </span>
              </div>
              <CartQuantity postId={item.product._id} quantity={item.count} />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
