import { LoaderPinwheel } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center my-10 min-h-screen">
      <LoaderPinwheel className="w-10 h-10 animate-spin text-inherit" />
    </div>
  );
}
