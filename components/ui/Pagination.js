"use client";

import { useMemo } from "react";

const DOTS = "...";

/**
 * A custom hook to generate a pagination range with ellipses.
 * This is a complex but crucial piece of logic for professional pagination.
 */
const usePagination = ({ totalPages, currentPage, siblingCount = 1 }) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + 1 + i
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPages, currentPage, siblingCount]);

  return paginationRange;
};

export default function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginationRange = usePagination({
    totalPages,
    currentPage,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <nav className="mt-8 flex justify-center">
      <ul className="flex list-none items-center rounded-md border border-gray-300 dark:border-gray-700">
        <li>
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 text-blue-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 dark:text-blue-400 dark:hover:bg-gray-800 dark:disabled:text-gray-600"
          >
            Prev
          </button>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={DOTS + index}
                className="border-x border-gray-300 px-4 py-2 text-gray-500 dark:border-gray-700"
              >
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={pageNumber}
              className="border-x border-gray-300 last:border-r-0 dark:border-gray-700"
            >
              <button
                onClick={() => onPageChange(pageNumber)}
                className={`px-4 py-2 transition-colors ${
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800"
                }`}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-blue-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 dark:text-blue-400 dark:hover:bg-gray-800 dark:disabled:text-gray-600"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
