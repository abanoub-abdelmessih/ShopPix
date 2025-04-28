"use client";
import { useCategories } from "@/hooks/useCategories";

const Products = () => {
  // const {
  //   data: categories,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery<CategoriesType[]>({
  //   queryFn: getAllCategories,
  //   queryKey: ["categories"],
  // });

  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  return (
    <div>
      {categories?.map((category) => (
        <p key={category._id}>{category.name}</p>
      ))}
    </div>
  );
};

export default Products;
