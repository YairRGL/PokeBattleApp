import React from 'react';
import './Paginator.css';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const displayPageNumbers = [];
  const pagesToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2)); // Avoid 0
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1); // Avoid exceeding the total number of pages

  if (totalPages <= pagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= Math.floor(pagesToShow / 2)) {
    endPage = pagesToShow;
  } else if (currentPage + Math.floor(pagesToShow / 2) >= totalPages) {
    startPage = totalPages - pagesToShow + 1;
  }

  for (let i = startPage; i <= endPage; i++) {
    displayPageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
    window.scrollTo(0, 0);
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      ></button>
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      ></button>
      <div className="page-numbers">
        {displayPageNumbers.map((pageNumber) => (
          <span
            key={pageNumber}
            className={`page-number ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </span>
        ))}
      </div>
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      ></button>
      <button
        className="pagination-button"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      ></button>
    </div>
  );
};

export default Paginator;