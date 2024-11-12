import axios from "axios";

// Define the API URL
const API_URL = "http://localhost:5001/info/book/";

const getInfoBook = async (bookId) => {
  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Ensure token is available before making the request
  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  try {
    // Make the GET request with the Authorization header
    const response = await axios.get(`${API_URL}${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data.book; 
  } catch (err) {
    console.error(err); 
    throw new Error("Failed to fetch book details.");
  }
};

export default getInfoBook;
