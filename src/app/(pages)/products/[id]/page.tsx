"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { useSpecificProduct } from "@/hooks/useProducts";
import {
  ChevronsRight,
  Heart,
  MinusCircle,
  Package,
  PlusCircle,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params.id as string;
  const { data: product, isLoading, isError } = useSpecificProduct(productId);
  const [selectedImage, setSelectedImage] = useState(product?.imageCover);
  const { register, handleSubmit, watch, setValue } = useForm();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl flex-1 text-indigo-800">
        <Loading /> Please Wait
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

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ));
  };
  const handleBrandClick = (brandId: string) => {
    const encodedBrandId = encodeURIComponent(brandId);
    router.push(`/products?brand[in]=${encodedBrandId}`);
  };

  const quantity = watch("quantity", 1);

  const handleIncrease = () => {
    setValue("quantity", quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setValue("quantity", quantity - 1);
    }
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Image Gallery Section */}
        <div className="md:col-span-6 lg:col-span-4">
          {/* Main Image */}
          <div className="relative aspect-square w-full bg-gray-50 dark:bg-zinc-700 rounded-xl overflow-hidden mb-4 shadow-md">
            <Image
              src={selectedImage || product.imageCover}
              alt={`${product.title} - Main view`}
              fill
              className="object-contain px-4"
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
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-square overflow-hidden border-2 transition-all rounded-xl ${
                    selectedImage === image
                      ? "border-indigo-600 dark:border-indigo-400"
                      : "border-transparent"
                  }`}
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
        <div className="md:col-span-5 lg:col-span-6 font-poppins bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
          {/* Title and Brand */}
          <div className="mb-4">
            {product.brand?.name && (
              <button
                onClick={() => handleBrandClick(product.brand._id)}
                className="inline-block mb-2 text-indigo-600 dark:text-indigo-400 font-medium"
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
              {renderStars(product.ratingsAverage || 0)}
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
          <div className="mb-8">
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
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="p-2.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-l-full disabled:text-zinc-400 dark:disabled:text-zinc-600 transition-colors"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.quantity}
                {...register("quantity", { min: 1 })}
                value={quantity}
                className="w-20 text-center border-x border-zinc-200 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white bg-transparent focus:outline-none"
              />
              <button
                onClick={handleIncrease}
                disabled={quantity >= product.quantity}
                className="p-2.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-r-full disabled:text-zinc-400 dark:disabled:text-zinc-600 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              type="button"
              disabled={product.quantity <= 0}
              className={`flex-1 flex items-center justify-center rounded-full px-8 py-3.5 text-base font-medium shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 `}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button
              type="button"
              className={`flex items-center justify-center rounded-full px-4 py-3.5 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none `}
            >
              <Heart className={`w-5 h-5 `} />
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
                <div className="bg-white dark:bg-zinc-800/50 p-4 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Brand
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                    {product.brand.name}
                  </dd>
                </div>
              )}
              {product.sold && (
                <div className="bg-white dark:bg-zinc-800/50 p-4 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700">
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
    </div>
  );
};

export default ProductDetailsPage;
