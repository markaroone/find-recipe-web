import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserProvider';
import { userStatus } from '../../context/UserProvider';
import NavModal from '../UI/Modal/NavModal';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';

const Header = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [showNavModal, setShowNavModal] = useState(false);

  const navigateHandler = (e) => {
    navigate(`/${e.target.id}`);
  };

  const toggleNavModalHandler = () => {
    setShowNavModal(!showNavModal);
  };

  showNavModal && console.log('Hi');

  return (
    <header className={styles.header}>
      <Logo />

      {user.status === userStatus.LOGGEDOUT && (
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
      )}

      {user.status === userStatus.LOGGEDIN && (
        <div
          className={styles['header__container--user-info']}
          onMouseEnter={toggleNavModalHandler}
          onMouseLeave={toggleNavModalHandler}
        >
          <div className={styles['header__container--user-photo']}>
            <img src={user.user.photo} alt={user.user.name} />
          </div>

          <p className={styles['header__label--user-name']}>{user.user.name}</p>

          <button className={styles['header__button--user-modal']}>
            <ion-icon name='chevron-down-sharp'></ion-icon>
          </button>

          {showNavModal && <NavModal />}
        </div>
      )}
    </header>
  );
};

export default Header;
