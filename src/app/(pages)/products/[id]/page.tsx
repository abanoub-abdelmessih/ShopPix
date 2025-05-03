"use client";

import { useSpecificProduct } from "@/hooks/useProducts";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Loader2, ShoppingCart, Heart, Star } from "lucide-react";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params.id as string;
  const { data: product, isLoading } = useSpecificProduct(productId);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <p className="mt-2 text-gray-600">
          The product you are looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden bg-gray-100">
            {product.imageCover && (
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                className="object-contain"
              />
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          <div className="mt-2 flex items-center">
            <div className="flex">
              {renderStars(product.ratingsAverage || 0)}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.ratingsQuantity || 0} reviews)
            </span>
          </div>

          <p className="mt-4 text-xl font-semibold text-blue-600">
            ${product.price?.toFixed(2)}
          </p>

          {product.priceAfterDiscount && (
            <p className="mt-1">
              <span className="text-sm text-gray-500 line-through mr-2">
                ${product.price?.toFixed(2)}
              </span>
              <span className="text-sm text-green-600">
                ${product.priceAfterDiscount?.toFixed(2)}
              </span>
            </p>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <div className="mt-1 flex rounded-md">
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Stock Status */}
          <div className="mt-4">
            <span
              className={`text-sm ${
                product.quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
            {product.quantity > 0 && product.quantity < 10 && (
              <span className="ml-2 text-sm text-orange-500">
                (Only {product.quantity} left)
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              disabled={product.quantity <= 0}
              className="flex-1 flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Heart className="w-5 h-5 mr-2" />
              Add to Wishlist
            </button>
          </div>

          {/* Additional Product Info */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {product.category?.name || "Uncategorized"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Brand</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {product.brand?.name || "Unknown"}
                </dd>
              </div>
              {product.sold && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Sold</dt>
                  <dd className="mt-1 text-sm text-gray-900">
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
