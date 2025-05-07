"use client";
import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import { useEffect, useState } from "react";

export const SpecificProductImages = ({
  product,
}: {
  product: ProductType;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.imageCover);
    }
  }, [product]);

  return (
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
  );
};
