import axios from "axios";

const API_URL = "http://localhost:5001/delete/book";

const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${API_URL}/${bookId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to delete book");
    }

    return response.data; 
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deleteBook;
