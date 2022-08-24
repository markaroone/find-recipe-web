import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavModal.module.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:8000/api/v1/users/logout';

const NavModal = () => {
  const signoutHandler = async () => {
    try {
      await axios.get(baseUrl);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.modal}>
      <Link className={styles['modal__link']} to={'/user-profile'}>
        My Profile
      </Link>
      <Link className={styles['modal__link']} to={'/my-recipes'}>
        My Recipes
      </Link>

      <button className={styles['modal__button']} onClick={signoutHandler}>
        Sign Out
      </button>
    </div>
  );
};

export default NavModal;
