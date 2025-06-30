"use client";

// Components
import { Button } from "@/components/ui/button";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2">
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
