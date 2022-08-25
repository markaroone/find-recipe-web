import React from 'react';
import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';
import errorSvg from '../assets/svg/404.svg';

const NotFound = () => {
  return (
    <div className={styles.error}>
      <img src={errorSvg} alt='' />
      <h1>404</h1>
      <h5>Oops!</h5>
      <h5>Page Not Found.</h5>
      <p>This page doesn't exist or was removed!</p>

      <Link to='/'>Back to Homepage</Link>
    </div>
  );
};

export default NotFound;
