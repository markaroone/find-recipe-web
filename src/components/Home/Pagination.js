import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, onNextPage, onPreviousPage }) => {
  return (
    <div className={styles.pagination}>
      <div className={styles['pagination__container']}>
        <button
          className={styles['pagination__button']}
          onClick={onPreviousPage}
        >
          <ion-icon name='chevron-back-sharp'></ion-icon>
        </button>

        <p className={styles['pagination__number']}>{currentPage}</p>

        <button className={styles['pagination__button']} onClick={onNextPage}>
          <ion-icon
            name='chevron-forward-sharp'
            ariaLabel='Next Page'
          ></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
