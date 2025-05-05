"use client";

import { ChevronsUpIcon } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";

export const ScrollToTopButton = () => {
  const scrolled = useScrolled(300);

  if (!scrolled) return null;

  function ScrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      className="fixed z-50 bottom-4 right-4 p-3 rounded-full bg-gradient-to-t from-indigo-700 via-indigo-600 to-indigo-500 text-white shadow-lg transition-all duration-300 border-2"
      onClick={ScrollTop}
    >
      <ChevronsUpIcon size={24} />
    </button>
  );
};
