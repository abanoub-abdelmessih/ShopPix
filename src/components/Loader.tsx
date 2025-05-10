import { cn } from "@/lib/utils";
import { LoaderPinwheel } from "lucide-react";

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="flex justify-center items-center my-10">
      <LoaderPinwheel
        className={cn("w-10 h-10 animate-spin  text-inherit", className)}
      />
    </div>
  );
};
