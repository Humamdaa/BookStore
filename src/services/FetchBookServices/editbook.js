import axios from "axios";

const API_URL = "http://localhost:5001/edit/book/";

//get book info

const updateBookInDB = async (bookId, bookData) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  try {
    const response = await axios.put(`${API_URL}${bookId}`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data; // Assuming response contains updated book or confirmation
    } else {
      throw new Error("Failed to update book.");
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An unexpected error occurred.");
  }
};

export default updateBookInDB;
