"use client";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/shared/products/ErrorMessage";
import { ProductCard } from "@/components/shared/products/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductType } from "@/types/ProductType";
import { useMemo } from "react";

const Wishlist = () => {
  const {
    data: wishListProducts,
    isLoading,
    isFetching,
    isError,
  } = useWishlist();

  const wishedIds = useMemo(
    () => wishListProducts?.data.map((p: ProductType) => p._id) || [],
    [wishListProducts]
  );

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl flex-1 ">
        <Loader /> Please Wait
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage description="An error occurred while loading wishlist products." />
    );
  }

  if (!wishListProducts || wishListProducts.data.length === 0) {
    return (
      <ErrorMessage
        title="Your wishlist is empty"
        description="Items you add to your wishlist will appear here."
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading
        title="Wishlist"
        description="Browse the items you've marked as favorites."
      />
      <div className="flex bg-gradient-to-t from-indigo-700 to-indigo-400 bg-clip-text text-transparent items-center gap-2 px-3">
        <h2 className="text-2xl font-bold ">Wishlist Products Count :</h2>
        <span className="text-lg font-bold">{wishListProducts.count}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
        {wishListProducts.data.map((product: ProductType) => (
          <div key={product._id}>
            <ProductCard
              product={product}
              isWished={wishedIds.includes(product._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
