"use client";
import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import { useState } from "react";

export const SpecificProductImages = ({
  product,
}: {
  product: ProductType;
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.imageCover
  );

  // Preload all images for faster switching
  const allImages = [product.imageCover, ...(product.images || [])];

  return (
    <div className="md:col-span-6 lg:col-span-4">
      {/* Main Image Display */}
      <div className="relative aspect-square w-full bg-gray-50 dark:bg-zinc-700 rounded-xl overflow-hidden mb-4 shadow-md">
        <Image
          src={selectedImage}
          alt={`${product.title} - Main view`}
          fill
          className="object-contain px-4 transition-opacity duration-200"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
        />
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              type="button"
              aria-label={`View image ${index + 1}`}
              className={`relative aspect-square overflow-hidden border-2 transition-all duration-200 rounded-lg ${
                selectedImage === image
                  ? "border-indigo-600 dark:border-indigo-400 shadow-md"
                  : "border-transparent hover:border-indigo-300 dark:hover:border-indigo-600/50"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`${product.title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 20vw, 10vw"
                quality={60}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
