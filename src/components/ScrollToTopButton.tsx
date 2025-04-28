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
      className="fixed z-50 bottom-4 right-4 p-3 rounded-full bg-slate-600 text-white shadow-lg hover:bg-gray-600 transition-all duration-300 border-2 border-slate-800 dark:border-slate-200 dark:bg-black dark:text-white"
      onClick={ScrollTop}
    >
      <ChevronsUpIcon size={24} />
    </button>
  );
};
