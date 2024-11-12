import axios from "axios";

const API_URL = "http://localhost:5001/me";

const fetchUserData = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return {
        name: response.data.name,
      };
    }
  } catch (error) {
    throw error.response
      ? new Error(error.response.data.message || "Failed to fetch user data.")
      : new Error("An unexpected error occurred.");
  }
};

export default fetchUserData;
