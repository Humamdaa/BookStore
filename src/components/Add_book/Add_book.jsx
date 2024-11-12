import React, { useState } from "react";
import styles from "./Add_book.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const API_URL = "http://localhost:5001/add/book"; // Update the URL with the correct endpoint for adding a book

const addBookToDB = async (bookData) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage

  try {
    const response = await axios.post(API_URL, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return response.data;
    } else if (response.status === 400) {
      return response.data;
    }
  } catch (error) {
    throw error.response
      ? new Error(error.response.data.message || "Failed to add the book.")
      : new Error("An unexpected error occurred.");
  }
};

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [content, setContent] = useState("");
  const [num_of_pges, setNumOfPages] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const newBook = {
      title,
      publishYear,
      content,
      num_of_pges,
    };

    try {
      const response = await addBookToDB(newBook);
      if (response.status === 201) {
        setSuccess(response.message);
        // Clear the form
        setTitle("");
        setPublishYear("");
        setContent("");
        setNumOfPages("");
      }
      if (response.status === 400) {
        setError(response.message);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Failed to add book.");
      }
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Book</h1>
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
        <button type="submit">Add Book</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <button
        className={styles.navButton}
        onClick={() => navigate("/get/books")}
      >
        <FontAwesomeIcon icon={faBook} /> Go to All Books
      </button>
    </div>
  );
};

export default AddBook;
