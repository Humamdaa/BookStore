import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./InfoBook.module.css";

const InfoBook = () => {
  const { state } = useLocation(); // Access the state passed from the navigate function
  const navigate = useNavigate();

  const [book] = useState(state?.book || null); // Get book from state or null if not found
  const [loading] = useState(false); // If the book is passed via state, no need for loading
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!state?.book) {
      // If no book was passed via state, display error
      setError("No book details found.");
    }
  }, [state]);

  const handleBackToHome = () => {
    navigate("/get/books");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className={styles.bookDetailContainer}>
      <button className={styles.navButton} onClick={handleBackToHome}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
      </button>

      <h1>{book.title} Book</h1>
      <p>
        <strong>Author:</strong> {book.author.first_name}{" "}
        {book.author.last_name}
      </p>
      <p>
        <strong>Email:</strong> {book.author.email}
      </p>
      <p>
        <strong>Publish Year:</strong> {book.publishYear}
      </p>
      <p>
        <strong>Content:</strong> {book.content}
      </p>
      <p>
        <strong>Number of Pages:</strong> {book.num_of_pges}
      </p>
    </div>
  );
};

export default InfoBook;
