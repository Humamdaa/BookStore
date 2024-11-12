import axios from "axios";

const API_URL = "http://localhost:5001/add/book"; // Update the URL with the correct endpoint for adding a book

const addBookToDB = async (bookData) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage

  try {
    const response = await axios.post(API_URL, bookData, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    });

    if (response.status === 201) {
      return response.data; // Assuming the response contains the newly added book or confirmation
    } else if (response.status === 400) {
      return response.data;
    }
  } catch (error) {
    throw error.response
      ? new Error(error.response.data.message || "Failed to add the book.")
      : new Error("An unexpected error occurred.");
  }
};

export default addBookToDB;
