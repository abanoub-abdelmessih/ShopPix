"use client";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/shared/products/ErrorMessage";
import { ProductCard } from "@/components/shared/products/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductType } from "@/types/ProductType";

const Wishlist = () => {
  const {
    data: wishListProducts,
    isLoading,
    isFetching,
    isError,
  } = useWishlist();

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
  const wishedIds = wishListProducts?.data.map((p: ProductType) => p._id) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading
        title="Wishlist"
        description="Browse the items you've marked as favorites."
      />

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
