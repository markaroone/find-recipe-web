import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';

const Header = () => {
  const navigate = useNavigate();

  const navigateHandler = (e) => {
    navigate(`/${e.target.id}`);
  };

  return (
    <header className={styles.header}>
      <Logo />

      <div className={styles['header__buttons--account']}>
        <button
          id='signin'
          className={styles['header__button--signin']}
          onClick={navigateHandler}
        >
          Sign In
        </button>
        <button
          id='signup'
          className={styles['header__button--signup']}
          onClick={navigateHandler}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
