import React from 'react';
import styles from './SigninStatusMessage.module.css';

const SigninStatusMessage = ({ isFormSubmitted, isSuccessful, message }) => {
  const renderSuccessMessage = () => {};

  const renderFailMessage = (message) => {};

  return <div className={styles['status']}>SigninStatusMessage</div>;
};

export default SigninStatusMessage;
