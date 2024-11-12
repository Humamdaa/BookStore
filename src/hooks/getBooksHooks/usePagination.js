import { useState, useCallback } from "react";

const usePagination = (initialPage, totalPages) => {
  const [page, setPage] = useState(initialPage);

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      console.log(totalPages);
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }, [page]);

  return { page, handleNextPage, handlePrevPage };
};

export default usePagination;
