"use client";

import { Loader } from "@/components/Loader";
import { ProductCard } from "@/components/shared/products/ProductCard";
import { RenderStars } from "@/components/shared/products/RenderStars";
import { Button } from "@/components/ui/button";
import { useProducts, useSpecificProduct } from "@/hooks/useProducts";
import {
  ChevronsRight,
  Heart,
  MinusCircle,
  Package,
  PlusCircle,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params.id as string;
  const { data: product, isLoading, isError } = useSpecificProduct(productId);
  const categoryId = product?.category._id;
  const { data: relatedProducts, isLoading: loadingRelatedProducts } =
    useProducts(1, 5, categoryId);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [theQuantity, setTheQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (product) {
      setSelectedImage(product.imageCover);
    }
  }, [product]);

  if (isLoading || loadingRelatedProducts) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl flex-1 ">
        <Loader /> Please Wait
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex items-center justify-center flex-col px-4 mx-auto max-w-2xl flex-1">
        <div className="mb-6 text-gray-400">
          <svg
            className="w-20 h-20 mx-auto"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          No products found
        </h3>

        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
          The product you are looking for doesn&apos;t exist or has been
          removed.
        </p>

        <Button
          className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          asChild
        >
          <Link href="/products" className="flex items-center gap-2">
            Browse All Products
            <ChevronsRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </div>
    );
  }

  const handleBrandClick = (brandId: string) => {
    const encodedBrandId = encodeURIComponent(brandId);
    router.push(`/products?brand[in]=${encodedBrandId}`);
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Image Gallery Section */}
        <div className="md:col-span-6 lg:col-span-4">
          <div className="relative aspect-square w-full bg-gray-50 dark:bg-zinc-700 rounded-xl overflow-hidden mb-4 shadow-md group">
            {/* The actual product image */}
            <Image
              src={selectedImage || product.imageCover}
              alt={`${product.title} - Main view`}
              fill
              className="object-contain px-4 transition-transform duration-300 ease-in-out group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </div>

          {/* Thumbnail Gallery */}
          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square overflow-hidden border-2 transition-all rounded-xl ${
                    selectedImage === image
                      ? "border-indigo-600 dark:border-indigo-400"
                      : "border-transparent hover:border-indigo-300 dark:hover:border-indigo-600/50"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 10vw"
                    quality={60}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

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
          <div className="flex items-center mb-6">
            <div className="flex">
              <RenderStars rating={product.ratingsAverage} />
            </div>
            <span className="ml-2 text-sm text-zinc-600 dark:text-zinc-300 font-medium">
              {product.ratingsAverage?.toFixed(1) || "0.0"}
            </span>
            <span className="mx-2 text-zinc-400">•</span>
            <span className="text-sm text-zinc-600 dark:text-zinc-300">
              {product.ratingsQuantity || 0} reviews
            </span>
            {product.sold && (
              <>
                <span className="mx-2 text-zinc-400">•</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-300">
                  {product.sold} sold
                </span>
              </>
            )}
          </div>

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

          {/* Quantity Selector */}
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

          {/* Action Buttons */}
          <div className="flex gap-4 mb-10">
            <button
              type="submit"
              disabled={product.quantity <= 0}
              className={`flex-1 flex items-center justify-center rounded-full px-8 py-3.5 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                product.quantity <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 "
              } text-white`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" strokeWidth={2} />
              Add to Cart
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-full w-14 h-14 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 group"
            >
              <Heart
                className="w-6 h-6 text-zinc-500 dark:text-zinc-400 group-hover:text-red-500 group-hover:fill-red-500 transition-colors duration-300"
                strokeWidth={1.5}
              />
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
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
