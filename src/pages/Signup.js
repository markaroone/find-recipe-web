import React, { useState, useEffect, useRef } from 'react';
import Logo from '../components/Logo/Logo';
import Input from '../components/UI/Input/Input';
import Modal from '../components/UI/Modal/Modal';
import SignupSuccessful from '../components/Registration/SignupSuccessful';
import styles from './Signup.module.css';
import validator from 'validator';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MIN_PASSWORD_LENGTH = 8;

const defaultUserInfo = {
  name: { value: '', isValid: null },
  email: { value: '', isValid: null },
  password: { value: '', isValid: null },
};

const Signup = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isSignupSuccess, setIsSignupSuccess] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(null);

  const userInfoOnChangeHandler = (e) => {
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
      return value.length > 0;
    }

    if (type === 'email') return validator.isEmail(value);

    if (type === 'password') return value.length >= MIN_PASSWORD_LENGTH;
  };

  const { isValid: nameIsValid } = userInfo.name;
  const { isValid: emailIsValid } = userInfo.email;
  const { isValid: passwordIsValid } = userInfo.password;
  const formValid = nameIsValid && emailIsValid && passwordIsValid;

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    let newUser;

    if (formValid)
      newUser = Object.entries(userInfo).reduce((user, current) => {
        return { ...user, [`${current[0]}`]: current[1].value };
      }, {});
    else if (!nameIsValid) return nameInputRef.current.focus();
    else if (!emailIsValid) return emailInputRef.current.focus();
    else if (!passwordIsValid) return passwordInputRef.current.focus();

    setIsFormSubmitted(true);

    try {
      const {
        data: {
          status,
          data: { user },
        },
      } = await axios.post(
        'http://localhost:8000/api/v1/users/signup',
        newUser
      );

      if (status === 'success') setIsSignupSuccess(true);

      if (status === 'success') setUserInfo(defaultUserInfo);
    } catch (error) {
      setIsSignupSuccess(false);
    }
  };

  const closeModalStatusHandler = () => {
    setIsFormSubmitted(false);
  };

  const renderUserSubmittedModal = () => {
    return (
      isFormSubmitted && (
        <Modal>
          <SignupSuccessful
            isProcessing={isFormSubmitted}
            isSuccessful={isSignupSuccess}
            successMessage='Your account has been created.'
            failMessage='An error occured. Try again later.'
            redirect={true}
            redirectName='Sign In'
            redirectLink='/signin'
            closeModalHandler={closeModalStatusHandler}
          />
        </Modal>
      )
    );
  };

  return (
    <section className={styles.signup}>
      <div className={styles['signup__logo']}>
        <Logo className='larger' />
      </div>

      <h2 className={styles['signup__header']}>Create an Account</h2>

      <form className={styles['signup__form']} onSubmit={formSubmitHandler}>
        <Input
          ref={nameInputRef}
          id='name'
          label='Name'
          type='input'
          isValid={nameIsValid}
          invalidMessage='Name should not be empty.'
          value={userInfo.name.value}
          onChange={userInfoOnChangeHandler}
          onBlur={userInfoOnChangeHandler}
          showValid={true}
        />

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
          showValid={true}
        />

        <Input
          ref={passwordInputRef}
          id='password'
          label='Password'
          type='password'
          isValid={passwordIsValid}
          invalidMessage='Password must contain at least 8 characters.'
          value={userInfo.password.value}
          onChange={userInfoOnChangeHandler}
          onBlur={userInfoOnChangeHandler}
          showValid={true}
          placeholder='Password must contain at least 8 characters.'
        />

        <button className={styles['signup__button--submit']}>Sign Up</button>
      </form>

      <p className={styles['signup__link--redirect']}>
        Already a user? <Link to='/signin'>Sign In</Link>
      </p>

      <p className={styles['signup__footer']}>
        &copy; 2022 FindRecipe Ltd. All Rights Reserved.
      </p>

      {renderUserSubmittedModal()}
    </section>
  );
};

export default Signup;
