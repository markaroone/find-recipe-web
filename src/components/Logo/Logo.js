import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
  const navigate = useNavigate();

  const clickLogoHandler = () => {
    navigate('/', { replace: true });
  };

  return (
    <i className={styles.logo} onClick={clickLogoHandler}>
      Find<span>Recipe</span>
    </i>
  );
};

export default Logo;
