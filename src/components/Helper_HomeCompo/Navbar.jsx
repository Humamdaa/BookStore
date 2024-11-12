// src/components/Home/Navbar.jsx
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styles from '../Home/home.module.css';

const Navbar = ({ name }) => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.text}>Book List</h1>
      <h3 className={styles.text}>Hi, {name}</h3>
      <button
        className={styles.white_btn}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
      <button
        className={styles.add_book_btn}
        onClick={() => navigate("/add/book")}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </nav>
  );
};

export default Navbar;
