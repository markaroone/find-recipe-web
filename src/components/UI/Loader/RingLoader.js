import React from 'react';
import styles from './RingLoader.module.css';

const RingLoader = () => {
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default RingLoader;
