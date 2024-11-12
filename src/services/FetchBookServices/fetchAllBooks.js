import axios from "axios";

const API_URL = "http://localhost:5001/get/books";

const fetchBooks = async (page, limit = 10) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    });
    if (response.status === 200) {
      return {
        books: response.data.books,
        totalPages: response.data.totalPages,
        name: response.data.name,
      };
    }
  } catch (error) {
    throw error.response
      ? new Error(error.response.data.message || "Failed to get books.")
      : new Error("An unexpected error occurred.");
  }
};

export default fetchBooks;
