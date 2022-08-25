import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../../context/UserProvider';
import axios from 'axios';
import styles from './NavModal.module.css';
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:8000/api/v1/users/logout';

const NavModal = () => {
  const { signoutUser, isLoggedIn } = useContext(UserContext);

  const signoutHandler = async () => {
    try {
      await axios.get(baseUrl);
      signoutUser();

      // window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.modal}>
      {isLoggedIn && (
        <>
          <Link className={styles['modal__link']} to={'/user-profile'}>
            My Profile
          </Link>
          <Link className={styles['modal__link']} to={'/my-recipes'}>
            My Recipes
          </Link>

          <button className={styles['modal__button']} onClick={signoutHandler}>
            Sign Out
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to='/signin' className={styles['modal__button']}>
            Sign in
          </Link>

          <Link
            to='/signup'
            className={`${styles['modal__button']} ${styles['modal__button--signup']}`}
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default NavModal;
