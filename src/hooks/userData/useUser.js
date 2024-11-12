import { useState, useEffect, useCallback } from "react";
import fetchUserData from "../../services/FetchUserServices/fetchUserName";

const useUser = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUserData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { name } = await fetchUserData();
      setName(name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return { name, loading, error };
};

export default useUser;
