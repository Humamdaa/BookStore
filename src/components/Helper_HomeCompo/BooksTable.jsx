// src/components/Home/BooksTable.jsx
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styles from '../Home/home.module.css';

const BooksTable = ({ books, onEdit, onDelete, onInfo }) => {
  return (
    <table className={styles.book_table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Publish Year</th>
          <th>Number of Pages</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book._id} className={book.same_user ? styles.sameUserRow : styles.normal}>
            <td>{book.title}</td>
            <td>{`${book.author.first_name} ${book.author.last_name}`}</td>
            <td>{book.publishYear}</td>
            <td>{book.num_of_pges}</td>
            <td>
              {book.same_user && (
                <div className={styles.actions}>
                  <button onClick={() => onEdit(book._id)} className={styles.action_btn}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => onDelete(book._id)} className={styles.action_btn}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              )}
              <button onClick={() => onInfo(book._id)} className={styles.action_btn}>
                <FontAwesomeIcon icon={faInfoCircle} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
