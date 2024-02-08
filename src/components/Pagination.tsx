import React, { useState, useEffect } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="px-3 py-1 mr-2 rounded-md bg-gray-200"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => goToPage(index + 1)}
          className={`px-3 py-1 mx-1 rounded-md ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1 ml-2 rounded-md bg-gray-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
