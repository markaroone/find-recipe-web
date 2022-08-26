import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RingLoaderSlow from '../UI/Loader/RingLoaderSlow';
import styles from './SignupSuccessful.module.css';

const REDIRECT_TIME = 2;

const SignupSuccessful = ({
  isProcessing,
  isSuccessful,
  successMessage,
  failMessage,
  redirect,
  redirectName,
  redirectLink,
  closeModalHandler,
}) => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate(redirectLink, { replace: true });
  };

  const redirectTimeoutHandler = () => {
    setTimeout(redirectHandler, REDIRECT_TIME * 1000);
  };

  const renderProcessing = () => {
    return (
      isProcessing &&
      isSuccessful === null && (
        <div className={styles['signup__modal--container-processing']}>
          <RingLoaderSlow />

          <p>Processing ...</p>
        </div>
      )
    );
  };

  useEffect(() => {
    isProcessing && isSuccessful && redirectTimeoutHandler();
  }, [isProcessing, isSuccessful]);

  const renderSuccessful = (message) => {
    if (isProcessing && isSuccessful)
      return (
        isProcessing &&
        isSuccessful && (
          <div className={styles['signup__modal--container-successful']}>
            <h3>
              <ion-icon name='checkmark-outline'></ion-icon> Success
            </h3>

            <p className={styles['signup__modal--message-successful']}>
              {message}
            </p>

            {redirect && (
              <p className={styles['signup__modal--message-redirect']}>
                Redirecting to{'  '}
                <button onClick={redirectHandler}>{redirectName}</button>.
              </p>
            )}
          </div>
        )
      );
  };

  const renderUnsuccessful = (message) => {
    return (
      isProcessing &&
      isSuccessful === false && (
        <div className={styles['signup__modal--container-unsuccessful']}>
          <h3>
            <ion-icon name='close-outline'></ion-icon> Fail
          </h3>

          <p className={styles['signup__modal--message-unsuccessful']}>
            {message}
          </p>

          <button onClick={closeModalHandler}>
            <ion-icon name='close-outline'></ion-icon>
          </button>
        </div>
      )
    );
  };

  return (
    <div className={styles['signup__modal']}>
      {renderProcessing()}
      {renderSuccessful(successMessage)}
      {renderUnsuccessful(failMessage)}
    </div>
  );
};

export default SignupSuccessful;
