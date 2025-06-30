"use client";

// Essentials
import clsx from "clsx";

// Components
import { Button } from "@/components/ui/button";

interface PROPS {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PROPS> = ({
  className,
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <div className={clsx("flex items-center justify-center gap-2", className)}>
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
