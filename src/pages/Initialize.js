import React from 'react';
import Logo from '../components/Logo/Logo';
import styles from './Initialize.module.css';

const Initialize = () => {
  return (
    <section className={styles.initialize}>
      <Logo className='larger' />
    </section>
  );
};

export default Initialize;
