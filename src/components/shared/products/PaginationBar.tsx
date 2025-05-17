import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { FC } from "react";

interface PaginationBarProps {
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  totalPages: number;
}

export const PaginationBar: FC<PaginationBarProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="mb-14 md:mb-5 flex-wrap" dir="ltr">
      <PaginationContent className="flex-wrap gap-0">
        <PaginationItem>
          <PaginationLink
            onClick={() => setCurrentPage(1)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          >
            <ChevronsLeft />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          >
            <ChevronLeft />
          </PaginationLink>
        </PaginationItem>

        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => setCurrentPage(page)}
              isActive={currentPage === page}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          >
            <ChevronRight />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            onClick={() => setCurrentPage(totalPages)}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          >
            <ChevronsRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
