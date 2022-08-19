import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles['footer__copyright']}>&copy; 2022 FindRecipe.</p>

      <ul>
        <li>
          <Link to={'#'}>Terms</Link>
        </li>
        <li>
          <Link to={'#'}>Privacy</Link>
        </li>
        <li>
          <Link to={'#'}>Security</Link>
        </li>
        <li>
          <Link to={'#'}>Get in Touch</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
