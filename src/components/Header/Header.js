import React from 'react';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />

      <div className={styles['header__buttons--account']}>
        <button className={styles['header__button--signin']}>Sign In</button>
        <button className={styles['header__button--signup']}>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
