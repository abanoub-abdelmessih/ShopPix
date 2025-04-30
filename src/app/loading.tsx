import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <LoaderIcon className="w-10 h-10 animate-spin" />
    </div>
  );
}
