import { LoaderPinwheel } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center my-10">
      <LoaderPinwheel className="w-10 h-10 animate-spin  text-inherit" />
    </div>
  );
};
