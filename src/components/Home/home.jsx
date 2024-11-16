import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TokenValidator from "../checkToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faEdit,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import deleteBook from "../../services/FetchBookServices/deletebook";
import usePagination from "../../hooks/getBooksHooks/usePagination";
import useBooks from "../../hooks/getBooksHooks/useBooks";

import styles from "./home.module.css";
import getInfoBook from "../../services/FetchBookServices/infobook";
import useUser from "../../hooks/userData/useUser";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation(); // This is where we can get the passed state
  const tokenValidator = new TokenValidator();

  const [total_Pages, setTotalPages] = useState(10);
  const [message, setMessage] = useState("");
  // Initial page and pagination hooks
  const { page, handleNextPage, handlePrevPage } = usePagination(
    1,
    total_Pages
  );

  // get books
  const { books, loading, error, totalPages, refetchBooks } = useBooks(page);
  // get name of user
  const { name } = useUser();

  useEffect(() => {
    if (books && books.length > 0) {
      const totalPagesFromBooks = totalPages || 10;
      setTotalPages(totalPagesFromBooks);
    }
  }, [books, totalPages]);

  // Token validation to check if the user session is valid
  useEffect(() => {
    tokenValidator.redirectIfInvalid(navigate);
  });

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      setTimeout(() => {
        setMessage("");
      }, 4000);
    }
  }, [location]);

  
  // Handler for deleting a book
  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const mes = await deleteBook(bookId);
        setMessage(mes.message);
        refetchBooks();
        setTimeout(() => setMessage(""), 4000); 
      } catch (err) {
        setMessage("Failed to delete the book");
        setTimeout(() => setMessage(""), 4000);
      }
    }
  };

  const handleEdit = async (bookId) => {
    try {
      const book = await getInfoBook(bookId); 
      if (book) {
        navigate(`/edit/book/${bookId}`, { state: { book } });
      } else {
        setMessage("Book not found.");
      }
    } catch (error) {
      console.error("Error fetching book details to updata :", error);
      setMessage("Failed to fetch book details.");
    } finally {
      setTimeout(() => setMessage(""), 4000);
    }
  };

  const handleInfo = async (bookId) => {
    try {
      const book = await getInfoBook(bookId);
      if (book) {
        // Pass the book data to the InfoBook component through navigation state
        navigate(`/info/book/${bookId}`, { state: { book } });
      } else {
        setMessage("Book not found.");
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
      setMessage("Failed to fetch book details.");
    } finally {
      // Optionally, reset the message after a delay
      setTimeout(() => setMessage(""), 4000);
    }
  };

  return (
    <div className={styles.home_container}>
      <nav className={styles.navbar}>
        <h1 className={styles.text}>Book List</h1>
        <h3 className={styles.text}>Hi, {name}</h3>
        <button
          className={styles.white_btn}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
        <button
          className={styles.add_book_btn}
          onClick={() => navigate("/add/book")}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </nav>

      <div className={styles.table_container}>
        {loading && <p>Loading...</p>}
        {(error || books.length === 0) && !loading ? (
          <p className={styles.empty_state}>{error || "No books available."}</p>
        ) : (
          <table className={styles.book_table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publish Year</th>
                <th>Number of Pages</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book._id}
                  className={
                    book.same_user ? styles.sameUserRow : styles.normal
                  }
                >
                  <td>{book.title}</td>
                  <td>{`${book.author.first_name} ${book.author.last_name}`}</td>
                  <td>{book.publishYear}</td>
                  <td>{book.num_of_pges}</td>
                  <td>
                    {book.same_user && (
                      <div className={styles.actions}>
                        <button
                          className={styles.action_btn}
                          onClick={() => handleEdit(book._id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className={styles.action_btn}
                          onClick={() => handleDelete(book._id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    )}
                    <button
                      className={styles.action_btn}
                      onClick={() => handleInfo(book._id)}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className={styles.pagination}>
          <button
            className={styles.white_btn}
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>{`Page ${page} of ${totalPages}`}</span>
          <button
            className={styles.white_btn}
            onClick={handleNextPage}
            disabled={page === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>

        {message && <div className={styles.cornerMessage}>{message}</div>}
      </div>
    </div>
  );
};

export default Home;
