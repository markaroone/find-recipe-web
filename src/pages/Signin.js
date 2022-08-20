import React, { useState, useEffect, useRef } from 'react';
import Logo from '../components/Logo/Logo';
import Input from '../components/UI/Input/Input';
import styles from './Signin.module.css';
import validator from 'validator';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MIN_PASSWORD_LENGTH = 8;

const defaultUserInfo = {
  email: { value: '', isValid: null },
  password: { value: '', isValid: null },
};

const Signin = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [userInfo, setUserInfo] = useState(defaultUserInfo);

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
      console.log(value.length > 0);
      return value.length > 0;
    }

    if (type === 'email') return validator.isEmail(value);

    if (type === 'password') return value.length >= MIN_PASSWORD_LENGTH;
  };

  const { isValid: emailIsValid } = userInfo.email;
  const { isValid: passwordIsValid } = userInfo.password;
  const formValid = emailIsValid && passwordIsValid;

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    let newUser;

    if (formValid)
      newUser = Object.entries(userInfo).reduce((user, current) => {
        return { ...user, [`${current[0]}`]: current[1].value };
      }, {});
    else if (!emailIsValid) emailInputRef.current.focus();
    else if (!passwordIsValid) passwordInputRef.current.focus();

    try {
      const {
        data: {
          status,
          data: { user },
        },
      } = await axios.post(
        'http://localhost:8000/api/v1/users/signin',
        newUser
      );

      if (status === 'success') setUserInfo(defaultUserInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.signin}>
      <div className={styles['signin__logo']}>
        <Logo className='larger' />
      </div>

      <h2 className={styles['signin__header']}>Welcome Back!</h2>

      <form onSubmit={formSubmitHandler}>
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
          invalidMessage='Password length must be greater than 8 characters.'
          value={userInfo.password.value}
          onChange={userInfoOnChangeHandler}
          onBlur={userInfoOnChangeHandler}
          showValid={true}
        />

        <button className={styles.submit}>Sign In</button>
      </form>

      <p className={styles['redirect--signin']}>
        Create an account. <Link to='/signup'>Sign Up</Link>
      </p>

      <p className={styles.footer}>
        &copy; 2022 FindRecipe Ltd. All Rights Reserved.
      </p>
    </section>
  );
};

export default Signin;
