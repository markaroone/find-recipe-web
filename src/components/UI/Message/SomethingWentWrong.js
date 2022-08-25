import React from 'react';
import styles from './SomethingWentWrong.module.css';

const SomethingWentWrong = () => {
  return (
    <div className={styles['error-container']}>
      <i>
        <ion-icon name='alert-circle-sharp'></ion-icon>
      </i>
      <h1>{'Something went wrong =('}</h1>
      <p>
        <button
          onClick={() => {
            window.location.reload(false);
          }}
        >
          Refresh
        </button>{' '}
        the page or Try again later
      </p>
    </div>
  );
};

export default SomethingWentWrong;
