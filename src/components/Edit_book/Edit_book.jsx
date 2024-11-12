import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "./Edit_book.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import updateBookInDB from "../../services/FetchBookServices/editbook";

const EditBook = () => {
  const { bookId } = useParams(); // Get the bookId from URL parameters
  const navigate = useNavigate();
  const location = useLocation(); // This is where we can get the passed state

  const [title, setTitle] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [content, setContent] = useState("");
  const [num_of_pges, setNumOfPages] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the state has been passed
    if (location.state && location.state.book) {
      const fetchedBook = location.state.book; // Get book from state
      setTitle(fetchedBook.title);
      setPublishYear(fetchedBook.publishYear);
      setContent(fetchedBook.content);
      setNumOfPages(fetchedBook.num_of_pges);
      setLoading(false); // Data is now available, no need to load from API
    } else {
      setError("Book not found.");
      setLoading(false); // Handle case where book data wasn't passed
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const updatedBook = {
      title,
      publishYear,
      content,
      num_of_pges,
    };

    try {
      await updateBookInDB(bookId, updatedBook);
      navigate("/get/books", {
        state: { message: "Book updated successfully!" },
      });
    } catch (error) {
      setError(error.message || "Failed to update book.");
    }
  };

  const handleBackToHome = () => {
    navigate("/get/books");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.navButton} onClick={handleBackToHome}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to All Books
      </button>

      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Publish Year"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Number of Pages"
          value={num_of_pges}
          onChange={(e) => setNumOfPages(e.target.value)}
          required
        />
        <button type="submit">Update Book</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </div>
  );
};

export default EditBook;
