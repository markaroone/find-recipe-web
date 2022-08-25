import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserProvider';
import { userStatus } from '../../context/UserProvider';
import NavModal from '../UI/Modal/NavModal';
import Logo from '../Logo/Logo';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const userInfoRef = useRef();

  const { user, setUser } = useContext(UserContext);
  const [showNavModal, setShowNavModal] = useState(false);

  const navigateHandler = (e) => {
    navigate(`/${e.target.id}`);
  };

  const toggleNavModalHandler = () => {
    setShowNavModal(!showNavModal);
  };

  const hideModalHandler = () => {
    setShowNavModal(false);
  };

  const isLoggedIn = user.status === userStatus.LOGGEDIN;

  useOutsideClick(userInfoRef, hideModalHandler);

  return (
    <header className={styles.header}>
      <Logo />
      {
        <div
          className={styles['header__container--user-info']}
          ref={userInfoRef}
          onClick={toggleNavModalHandler}
        >
          {!isLoggedIn && (
            <>
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

              <button
                className={styles['header__button--signin-mobile']}
                onClick={toggleNavModalHandler}
              >
                <img
                  src='https://res.cloudinary.com/dqwdu3tfn/image/upload/v1658724546/layag-users/default_iframk.png'
                  alt='Default user'
                />
              </button>
            </>
          )}

          {isLoggedIn && (
            <>
              <div className={styles['header__container--user-photo']}>
                <img src={user.user.photo} alt={user.user.name} />
              </div>

              <p className={styles['header__label--user-name']}>
                {user.user.name}
              </p>

              <button className={styles['header__button--user-modal']}>
                <ion-icon name='chevron-down-sharp'></ion-icon>
              </button>
            </>
          )}

          {showNavModal && <NavModal />}
        </div>
      }
    </header>
  );
};

export default Header;
