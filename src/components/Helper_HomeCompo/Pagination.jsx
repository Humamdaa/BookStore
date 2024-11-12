// src/components/Home/Pagination.jsx
import React from 'react';
import styles from '../Home/home.module.css';

const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.white_btn}
        onClick={onPrev}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>{`Page ${page} of ${totalPages}`}</span>
      <button
        className={styles.white_btn}
        onClick={onNext}
        disabled={page === totalPages || totalPages === 0}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
