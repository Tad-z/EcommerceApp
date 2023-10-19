import React from "react";
import styles from "../styles/Home.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (j, i) => i + 1);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.pageBtn} onClick={handlePreviousPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={styles.btnIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      {pageNumbers.slice(0, 6).map((pageNumber) => (
        <a
          key={pageNumber}
          className={`${styles.links} ${pageNumber === currentPage ? styles.color : ""}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </a>
      ))}
      <span>...</span>
      <a className={styles.links} onClick={() => onPageChange(totalPages)}>
        {totalPages}
      </a>
      <button className={styles.pageBtn} onClick={handleNextPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={styles.btnIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
