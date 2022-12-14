import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import Logo from '../components/Logo/Logo';
import Input from '../components/UI/Input/Input';
import Modal from '../components/UI/Modal/Modal';
import SignupSuccessful from '../components/StatusMessage/SignupSuccessful';
import UserContext from '../context/UserProvider';
import { userStatus } from '../context/UserProvider';
import { signinUrl } from '../api/findRecipeServer';
import styles from './Signin.module.css';

axios.defaults.withCredentials = true;

const defaultUserInfo = {
  email: { value: '', isValid: null },
  password: { value: '', isValid: null },
};

const Signin = () => {
  const { setUser } = useContext(UserContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isFormSubmitted, setIsFormSubmitted] = useState(null);
  const [isSigninSuccessful, setIsSigninSuccessful] = useState(null);
  const [errorMessage, setErrorMessage] = useState('An error occured.');

  const { isValid: emailIsValid } = userInfo.email;
  const { isValid: passwordIsValid } = userInfo.password;
  const formValid = emailIsValid && passwordIsValid;

  const userInfoOnChangeHandler = (e) => {
    clearSubmitStatus();
    const { id, value } = e.target;

    let isValid = false;

    isValid = inputValidator(value, id);

    setUserInfo((prev) => ({
      ...prev,
      [`${id}`]: { ...prev[`${id}`], value, isValid },
    }));
  };

  const inputValidator = (value, type) => {
    if (!value || !type) return false;

    if (type === 'name') {
      console.log(value.length > 0);
      return value.length > 0;
    }

    if (type === 'email') return validator.isEmail(value);

    if (type === 'password') return value.length >= 0;
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    let newUser;

    if (formValid)
      newUser = Object.entries(userInfo).reduce((user, current) => {
        return { ...user, [`${current[0]}`]: current[1].value };
      }, {});
    else if (!emailIsValid) return emailInputRef.current.focus();
    else if (!passwordIsValid) return passwordInputRef.current.focus();

    setIsFormSubmitted(true);

    try {
      const {
        data: {
          status,
          data: { user },
        },
      } = await axios.post(signinUrl, newUser);

      setUser({
        status: userStatus.LOGGEDIN,
        user: {
          ...user,
          id: user._id,
        },
      });
      if (status === 'success') setUserInfo(defaultUserInfo);

      setIsSigninSuccessful(true);
    } catch (error) {
      if (error.response.status === 401)
        setErrorMessage(error.response.data.message);

      if (error.response.status === 0) setErrorMessage(error.message);

      setIsSigninSuccessful(false);
      setIsFormSubmitted(null);
    }
  };

  const renderErrorMessage = () => {
    if (isSigninSuccessful === false) {
      setTimeout(() => {
        clearSubmitStatus();
      }, 5000);

      return (
        <p className={styles['signin__message--failed']}>{errorMessage}</p>
      );
    }
    return null;
  };

  const renderSuccessMessage = () => {
    return (
      isSigninSuccessful && (
        <Modal>
          <SignupSuccessful
            isProcessing={isFormSubmitted}
            isSuccessful={isSigninSuccessful}
            successMessage='Login success!'
            redirect={true}
            redirectName='Home'
            redirectLink='/'
            closeModalHandler={clearSubmitStatus}
          />
        </Modal>
      )
    );
  };

  const clearSubmitStatus = () => {
    setIsFormSubmitted(null);
    setIsSigninSuccessful(null);
  };

  return (
    <section className={styles.signin}>
      <div className={styles['signin__logo']}>
        <Logo className='larger' />
      </div>

      <h2 className={styles['signin__header']}>Welcome Back!</h2>

      <form className={styles['signin__form']} onSubmit={formSubmitHandler}>
        {renderErrorMessage()}

        <Input
          ref={emailInputRef}
          id='email'
          label='Email'
          type='email'
          isValid={emailIsValid}
          invalidMessage='Please enter a valid email address.'
          value={userInfo.email.value}
          onChange={userInfoOnChangeHandler}
          onBlur={userInfoOnChangeHandler}
        />

        <Input
          ref={passwordInputRef}
          id='password'
          label='Password'
          type='password'
          isValid={passwordIsValid}
          invalidMessage='Enter your password.'
          value={userInfo.password.value}
          onChange={userInfoOnChangeHandler}
          onBlur={userInfoOnChangeHandler}
        />

        <button className={styles['signin__button--submit']}>
          {isFormSubmitted && !isSigninSuccessful ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <p className={styles['redirect--signin']}>
        Create an account. <Link to='/signup'>Sign Up</Link>
      </p>

      <p className={styles['signin__footer']}>
        &copy; 2022 FindRecipe Ltd. All Rights Reserved.
      </p>

      {renderSuccessMessage()}
    </section>
  );
};

export default Signin;
