import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./register.module.css";

const Register = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5001/api/register";
      const { data: res } = await axios.post(url, data);
      // console.log("status:", res);
      // Check if the user was created successfully
      if (res.status === 200) {
        localStorage.setItem(
          "successMessage",
          "Registration successful! Please log in."
        );
        navigate("/login");
      } else {
        setError(res.message);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again."); // Generic error message
      }
    }
  };

  return (
    <div className={styles.Register_container}>
      <div className={styles.Register_form_container}>
        <div className={styles.left}>
          <h1>Welocm Back, please Register</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              login
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Creaet New Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={handleChange}
              value={data.first_name}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={handleChange}
              value={data.last_name}
              required
              className={styles.input}
            />
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
              placeholder="Passwrod"
              name="password"
              onChange={handleChange}
              value={data.passwrod}
              required
              className={styles.input}
            />

            {error && <div className={styles.error_msg}>{error}</div>}

            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
