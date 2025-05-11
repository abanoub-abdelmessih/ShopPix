import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CartData } from "@/types/CartType";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { CartActionButtons } from "./CartActionButtons";

interface CartTableProps {
  cartData: CartData;
  wishedIds: string[];
  loadingAdd: boolean;
  loadingRemove: boolean;
  toggleWishlist: (productId: string, e: MouseEvent<HTMLButtonElement>) => void;
}

export const CartTable = ({
  cartData,
  wishedIds,
  loadingAdd,
  loadingRemove,
  toggleWishlist,
}: CartTableProps) => {
  return (
    <div className="hidden lg:block rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-zinc-800">
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartData.data.products.map((item) => {
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
                    {(item.product?.title).split(" ").slice(0, 3).join(" ") ||
                      "N/A"}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {item.product?.ratingsAverage?.toFixed(1) || "0.0"}
                    </span>
                  </div>
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
                <TableCell>
                  <CartActionButtons
                    isWished={isWished}
                    item={item}
                    loadingAdd={loadingAdd}
                    loadingRemove={loadingRemove}
                    toggleWishlist={toggleWishlist}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
