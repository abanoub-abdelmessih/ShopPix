"use client";

import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/shared/products/ErrorMessage";
import { useGetOrders } from "@/hooks/useOrders";
import { CartProduct } from "@/types/CartType";
import { OrderType } from "@/types/OrderType";
import Image from "next/image";
import Link from "next/link";
import { Package, CreditCard, Truck, Calendar } from "lucide-react";
import { Heading } from "@/components/Heading";

const AllOrders = () => {
  const { data: orders, isLoading, isError, isFetching } = useGetOrders();

  // Preserved loading state
  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl flex-1 text-gray-700 dark:text-zinc-300">
        <Loader /> Please Wait
      </div>
    );
  }

  // Preserved error state
  if (isError) {
    return (
      <ErrorMessage
        title="No orders found"
        description="An error occurred while loading your orders."
      />
    );
  }

  // Preserved empty state
  if (!orders || orders.length === 0) {
    return (
      <ErrorMessage
        title="You don't have any orders yet"
        description="Browse our products and place your first order to see it here."
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <Heading
        title="Your Orders"
        description="Review all your previous orders, their details, and status here."
      />

      {orders.map((order: OrderType) => (
        <div
          key={order._id}
          className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-zinc-700"
        >
          {/* Order Header */}
          <div className="bg-gray-50 dark:bg-zinc-900 p-4 border-b border-gray-100 dark:border-zinc-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Order #{order._id.substring(order._id.length - 6)}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200">
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.isDelivered
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "In Transit"}
                </span>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Order Info */}
              <div className="space-y-4">
                {/* Shipping Address */}
                <div className="bg-gray-50 dark:bg-zinc-900 rounded-lg p-4 mb-2">
                  <h4 className="font-medium text-gray-800 dark:text-zinc-200 mb-2">
                    Shipping Address
                  </h4>
                  {order.shippingAddress ? (
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-700 dark:text-zinc-300">
                        {order.shippingAddress.details}
                      </p>
                      <p className="text-gray-700 dark:text-zinc-300">
                        Phone: {order.shippingAddress.phone}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-zinc-400 text-sm">
                      No shipping address provided
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-gray-700 dark:text-zinc-300">
                  <CreditCard className="h-4 w-4 text-gray-500 dark:text-zinc-400" />
                  <span className="text-sm">
                    Paid with {order.paymentMethodType}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-700 dark:text-zinc-300">
                  <Truck className="h-4 w-4 text-gray-500 dark:text-zinc-400" />
                  <span className="text-sm">
                    {order.isDelivered ? "Delivered" : "Shipping in progress"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-700 dark:text-zinc-300">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-zinc-400" />
                  <span className="text-sm">
                    Order placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Right Column - Price Summary */}
              <div className="bg-gray-50 dark:bg-zinc-900 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 dark:text-zinc-200 mb-3">
                  Order Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">
                      Subtotal
                    </span>
                    <span className="text-gray-800 dark:text-zinc-200">
                      $
                      {(
                        order.totalOrderPrice -
                        order.taxPrice -
                        order.shippingPrice
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">
                      Shipping
                    </span>
                    <span className="text-gray-800 dark:text-zinc-200">
                      ${order.shippingPrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">
                      Tax
                    </span>
                    <span className="text-gray-800 dark:text-zinc-200">
                      ${order.taxPrice}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-zinc-700 pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-800 dark:text-zinc-200">
                        Total
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ${order.totalOrderPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-800 dark:text-zinc-200 mb-3">
                Items ({order.cartItems.length})
              </h4>
              <div className="space-y-3">
                {order.cartItems.map((item: CartProduct) => (
                  <Link
                    href={`/products/${item.product._id}`}
                    key={item._id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors border border-gray-100 dark:border-zinc-700"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        className="object-cover rounded-md"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 dark:text-zinc-100 truncate">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                        Qty: {item.count}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                        ${(item.price * item.count).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
