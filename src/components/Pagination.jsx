import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // generates page numbers
  const getPageNumbers = () => {
    if (totalPages < 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center">
      <button
        className="w-10 h-10 flex items-center justify-center border border-gray-700 rounded-l-lg bg-indigo-900 hover:bg-indigo-950 transition cursor-pointer disabled:opacity-50"
        disabled={currentPage < 6 || currentPage === 1}
        onClick={() => onPageChange(currentPage - 5)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="size-5 fill-white"
        >
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
        </svg>
      </button>
      <button
        className="w-10 h-10 flex items-center justify-center bg-indigo-900 hover:bg-indigo-950 transition cursor-pointer disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="size-4 fill-white"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`w-10 h-10 flex items-center justify-center border border-gray-700 text-white transition cursor-pointer
        ${
          number === currentPage
            ? "border-indigo-500 bg-indigo-600 hover:bg-indigo-700"
            : "bg-gray-800 hover:bg-gray-900"
        }`}
          onClick={() => onPageChange(number)}
          disabled={number === currentPage}
        >
          {number}
        </button>
      ))}
      <button
        className="w-10 h-10 flex items-center justify-center border border-gray-700 bg-indigo-900 hover:bg-indigo-950 transition cursor-pointer disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="size-4 fill-white"
        >
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
        </svg>
      </button>
      <button
        className="w-10 h-10 flex items-center justify-center border border-gray-700 rounded-r-lg bg-indigo-900 hover:bg-indigo-950 transition cursor-pointer disabled:opacity-50"
        disabled={
          currentPage > totalPages - 5 ||
          currentPage === Math.min(totalPages, 500)
        }
        onClick={() => onPageChange(currentPage + 5)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="size-5 fill-white"
        >
          <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
