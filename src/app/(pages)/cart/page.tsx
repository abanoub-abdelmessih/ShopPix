/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/shared/products/ErrorMessage";
import { useGetCart } from "@/hooks/useCart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Heading } from "@/components/Heading";
import { Heart, Trash } from "lucide-react";
import Link from "next/link";
import {
  useAddWishlist,
  useRemoveWishlist,
  useWishlist,
} from "@/hooks/useWishlist";
import { useMemo } from "react";
import { ProductType } from "@/types/ProductType";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const { data: cartData, isError, isFetching, isLoading } = useGetCart();
  const { data: wishListProducts } = useWishlist();
  const { mutate: addToWishList, isPending: loadingAdd } = useAddWishlist();
  const { mutate: removeFromWishList, isPending: loadingRemove } =
    useRemoveWishlist();

  const wishedIds = useMemo(
    () => wishListProducts?.data.map((p: ProductType) => p._id) || [],
    [wishListProducts]
  );

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl flex-1">
        <Loader /> Please Wait
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage description="An error occurred while loading cart products." />
    );
  }

  if (!cartData || cartData.data.products.length === 0) {
    return (
      <ErrorMessage
        title="Your cart is empty"
        description="Items you add to your cart will appear here."
      />
    );
  }

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishedIds.includes(productId)) {
      removeFromWishList(productId);
    } else {
      addToWishList(productId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Heading
        title="Your Shopping Cart"
        description="Review your selected items before checkout."
      />
      <div className="flex bg-gradient-to-t from-indigo-700 to-indigo-400 bg-clip-text text-transparent items-center gap-2 mb-3 px-3">
        <h2 className="text-2xl font-bold ">Cart Products Count :</h2>
        <span className="text-lg font-bold">{cartData.numOfCartItems}</span>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-zinc-800">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartData.data.products.map((item: any) => {
              const isWished = wishedIds.includes(item.product?._id);
              return (
                <TableRow
                  key={item._id}
                  className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/40"
                >
                  <TableCell>
                    <div className="relative w-[100px] h-[100px] rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800/70">
                      <Image
                        src={item.product?.imageCover || "/placeholder.png"}
                        alt={item.product?.title || "Product"}
                        fill
                        property="true"
                        className="object-contain rounded-lg"
                        sizes="100px"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`/products/${item.product?._id}`}
                      className="hover:underline"
                    >
                      {item.product?.title || "N/A"}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center justify-center min-w-[32px] h-6 px-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium">
                      {item.count}
                    </span>
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell className="font-medium text-indigo-600 dark:text-indigo-400">
                    ${(item.count * item.price).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <button
                      onClick={(e) => toggleWishlist(item.product?._id, e)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                      disabled={loadingAdd || loadingRemove}
                    >
                      <Heart
                        size={20}
                        className={
                          isWished
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }
                      />
                    </button>
                    <button className="p-1 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-colors">
                      <Trash size={20} />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {cartData.data.products.map((item: any) => {
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
                      alt={item.product?.title || "Product"}
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
                          each
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => toggleWishlist(item.product?._id, e)}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                          disabled={loadingAdd || loadingRemove}
                        >
                          <Heart
                            size={18}
                            className={
                              isWished
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400"
                            }
                          />
                        </button>
                        <button className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash size={18} />
                        </button>
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
                            × item{item.count !== 1 && "s"}
                          </span>
                        </div>

                        <div className="text-right">
                          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
                            Total
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
              <CardFooter className="justify-end gap-2 border-t py-3">
                <Link
                  href={`/products/${item.product?._id}`}
                  className="px-3 py-1 text-xs bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300 rounded font-medium transition-colors"
                >
                  View details
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row items-end sm:items-center justify-between mt-8 pt-4 border-t border-gray-200 dark:border-zinc-800">
        <div className="flex gap-2 flex-col md:flex-row w-full mb-4 md:mb-0">
          <Button variant="destructive">
            <Trash /> Clear Cart
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white transition-colors ">
            Proceed to Checkout
          </Button>
        </div>
        <div className="text-xl font-semibold text-right text-gray-900 dark:text-white">
          Total:
          <span className="text-indigo-600 dark:text-indigo-400 ml-2">
            ${cartData.data.totalCartPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
