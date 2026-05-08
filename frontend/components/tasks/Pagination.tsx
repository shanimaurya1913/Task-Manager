"use client";

import { Button } from "@/components/common/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-slate-500">
        Page <span className="font-semibold text-slate-900">{currentPage}</span>{" "}
        of <span className="font-semibold text-slate-900">{totalPages}</span>
      </p>
      <div className="grid w-full grid-cols-2 gap-2 sm:w-auto">
        <Button
          variant="secondary"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
