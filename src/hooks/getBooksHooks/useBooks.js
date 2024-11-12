import { useState, useEffect, useCallback } from "react";
import fetchBooks from "../../services/FetchBookServices/fetchAllBooks";

const useBooks = (page) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const getBooks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { books, totalPages } = await fetchBooks(page);
      setBooks(books);
      setTotalPages(totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const refetchBooks = useCallback(() => {
    getBooks();
  }, [getBooks]);

  return { books, loading, error, totalPages, refetchBooks };
};

export default useBooks;
