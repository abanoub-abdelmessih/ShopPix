"use client";

import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/shared/products/ErrorMessage";
import { ProductCard } from "@/components/shared/products/ProductCard";
import { SpecificProductImages } from "@/components/shared/products/SpecificProduct/SpecificProductImages";
import { SpecificProductRating } from "@/components/shared/products/SpecificProduct/SpecificProductRating";
import { useAddToCart } from "@/hooks/useCart";
import { useProducts, useSpecificProduct } from "@/hooks/useProducts";
import {
  useAddWishlist,
  useRemoveWishlist,
  useWishlist,
} from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/ProductType";
import {
  ChevronsRight,
  Heart,
  LoaderPinwheel,
  Package,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params.id as string;
  const { data: product, isLoading, isError } = useSpecificProduct(productId);
  const categoryId = product?.category._id;
  const { data: relatedProducts, isLoading: loadingRelatedProducts } =
    useProducts({ page: 1, limit: 5, categoryId: categoryId });
  const { data: wishListProducts, isLoading: LoadingWishList } = useWishlist();
  const { mutate: addToWishList, isPending: loadingAdd } = useAddWishlist();
  const { mutate: removeFromWishList, isPending: loadingRemove } =
    useRemoveWishlist();
  const { mutate: addToCart, isPending: loadingAddCart } = useAddToCart();

  const wishedIds = useMemo(
    () => wishListProducts?.data.map((p: ProductType) => p._id) || [],
    [wishListProducts]
  );

  const router = useRouter();

  if (isLoading || loadingRelatedProducts || LoadingWishList) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl flex-1 ">
        <Loader /> Please Wait
      </div>
    );
  }

  if (isError || !product) {
    return (
      <ErrorMessage
        description="The product you are looking for doesn't exist or has been
          removed."
      />
    );
  }

  const handleBrandClick = (brandId: string) => {
    const encodedBrandId = encodeURIComponent(brandId);
    router.push(`/products?brand[in]=${encodedBrandId}`);
  };

  const isWished = wishedIds.includes(product._id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWished) {
      removeFromWishList(product._id);
    } else {
      addToWishList(product._id);
    }
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Image Gallery Section */}
        <SpecificProductImages product={product} />

        {/* Product Details Section */}
        <div className="md:col-span-6 font-poppins bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg ">
          {/* Title and Brand */}
          <div className="mb-4">
            {product.brand?.name && (
              <button
                onClick={() => handleBrandClick(product.brand._id)}
                className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-md text-center mb-2"
              >
                {product.brand.name}
              </button>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Rating */}
          <SpecificProductRating product={product} />

          {/* Pricing */}
          <div className="mb-6">
            {product.priceAfterDiscount ? (
              <div className="flex items-center">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  ${product.priceAfterDiscount.toFixed(2)}
                </p>
                <p className="ml-3 text-lg text-zinc-500 line-through">
                  ${product.price.toFixed(2)}
                </p>
                <span className="ml-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-md text-center">
                  SAVE $
                  {(product.price - product.priceAfterDiscount).toFixed(2)}
                </span>
              </div>
            ) : (
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="mb-6 flex flex-wrap">
            <Link
              href={`/products?category[in]=${product.category._id}`}
              className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-md text-center"
            >
              {product.category.name}
            </Link>
            <Link
              href={`/products?subcategory[in]=${product.subcategory[0]._id}`}
              className="ml-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-md text-center"
            >
              {product.subcategory[0].name}
            </Link>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
              Description
            </h3>
            <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-5 shadow border border-zinc-100 dark:border-zinc-700">
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-8">
            <div className="flex items-center">
              <span
                className={`inline-flex w-3 h-3 rounded-full mr-2 ${
                  product.quantity > 0
                    ? "bg-green-500 animate-pulse"
                    : "bg-red-500"
                }`}
              />
              <span
                className={`font-medium ${
                  product.quantity > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
              {product.quantity > 0 && product.quantity < 10 && (
                <span className="ml-3 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                  Only {product.quantity} left
                </span>
              )}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-4 mb-10">
            <button
              type="submit"
              disabled={product.quantity <= 0}
              className={`flex-1 flex items-center justify-center rounded-full px-8 py-3.5 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300  ${
                product.quantity <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 "
              } text-white`}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product._id);
              }}
            >
              {loadingAddCart ? (
                <LoaderPinwheel className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" strokeWidth={2} />
                  Add to Cart
                </>
              )}
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-full w-14 h-14 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none hover:bg-red-50 dark:hover:bg-red-900/20 group"
              onClick={toggleWishlist}
            >
              {loadingAdd || loadingRemove ? (
                <LoaderPinwheel className="animate-spin" />
              ) : (
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors",
                    wishedIds.includes(product._id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                  )}
                />
              )}
            </button>
          </div>

          {/* Product Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="flex items-center bg-white dark:bg-zinc-800/50 p-3 rounded-xl shadow border border-zinc-100 dark:border-zinc-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
              <div className="mr-3 bg-indigo-100 dark:bg-indigo-900/30 p-2.5 rounded-full">
                <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  Free Shipping
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-center bg-white dark:bg-zinc-800/50 p-3 rounded-xl shadow border border-zinc-100 dark:border-zinc-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
              <div className="mr-3 bg-indigo-100 dark:bg-indigo-900/30 p-2.5 rounded-full">
                <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  Easy Returns
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  30-day return policy
                </p>
              </div>
            </div>
            <div className="flex items-center bg-white dark:bg-zinc-800/50 p-3 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
              <div className="mr-3 bg-indigo-100 dark:bg-indigo-900/30 p-2.5 rounded-full">
                <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  Secure Payment
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  100% safe checkout
                </p>
              </div>
            </div>
          </div>

          {/* Additional Product Info */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.brand?.name && (
                <div className="bg-white dark:bg-zinc-800/50 p-4 rounded-xl shadow-md border border-zinc-100 dark:border-zinc-700">
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Brand
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                    {product.brand.name}
                  </dd>
                </div>
              )}
              {product.sold && (
                <div className="bg-white dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-700 shadow-md">
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Units Sold
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                    {product.sold} units
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Related Products
            </h2>
            <Link
              href={`/products?category[in]=${categoryId}`}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center group hover:underline"
            >
              View All
              <ChevronsRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {relatedProducts.data.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                isWished={wishedIds.includes(product._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
