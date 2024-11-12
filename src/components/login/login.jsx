import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const message = localStorage.getItem("successMessage");
    if (message) {
      setSuccessMessage(message);
      localStorage.removeItem("successMessage"); // Clear immediately
    }
  }, []);

  useEffect(() => {
    // Clear message after 5 seconds
    const timer = setTimeout(() => {
      // console.log("Clearing success message after 5 seconds");
      setSuccessMessage("");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      const url = "http://localhost:5001/api/login";
      const { data: res } = await axios.post(url, data);
      // console.log("res:", res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data);
        navigate("/get/books");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(
          error.response.data.message || "An error occurred. Please try again."
        );
        // Clear error after 5 seconds
        const timer = setTimeout(() => {
          setError("");
        }, 5000);
        return () => clearTimeout(timer); // Cleanup timer on unmount
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Please login</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {successMessage && (
              <div className={styles.success_msg}>{successMessage}</div>
            )}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here!</h1>
          <Link to="/register">
            <button type="button" className={styles.white_btn}>
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
