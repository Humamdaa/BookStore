import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './notFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.not_found_container}>
      <h1 className={styles.n_f_c}>404</h1>
      <h3 className={styles.n_f_exp}>Page is not found</h3>
      <button className={styles.login_button} onClick={() => navigate('/login')}>
        Go to Login
      </button>
    </div>
  );
};

export default NotFound;
