import React, { useState, useEffect, useRef, useContext } from 'react';
import Logo from '../components/Logo/Logo';
import Input from '../components/UI/Input/Input';
import styles from './Signin.module.css';
import validator from 'validator';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MIN_PASSWORD_LENGTH = 8;

const defaultUserInfo = {
  name: { value: '', isValid: null },
  email: { value: '', isValid: null },
  password: { value: '', isValid: null },
  passwordConfirm: { value: '', isValid: null },
};

const Signin = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();

  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  const userInfoOnChangeHandler = (e) => {
    const { id, value } = e.target;

    let isValid = false;

    if (id === 'passwordConfirm') {
      const { value: prevPassword } = userInfo.password;
      isValid = inputValidator(value, id, prevPassword);
    } else isValid = inputValidator(value, id);

    setUserInfo((prev) => ({
      ...prev,
      [`${id}`]: { ...prev[`${id}`], value, isValid },
    }));
  };

  const inputValidator = (value, type, origPassword) => {
    if (!value || !type) return false;

    if (type === 'name') {
      console.log(value.length > 0);
      return value.length > 0;
    }

    if (type === 'email') return validator.isEmail(value);
    if (type === 'password') return value.length >= MIN_PASSWORD_LENGTH;

    if (type === 'passwordConfirm' && !origPassword) return false;
    else if (type === 'passwordConfirm' && origPassword)
      return value === origPassword;
  };

  const { isValid: nameIsValid } = userInfo.name;
  const { isValid: emailIsValid } = userInfo.email;
  const { isValid: passwordIsValid } = userInfo.password;
  const { isValid: passwordConfirmIsValid } = userInfo.passwordConfirm;
  const formValid =
    nameIsValid && emailIsValid && passwordIsValid && passwordConfirmIsValid;

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    let newUser;

    if (formValid)
      newUser = Object.entries(userInfo).reduce((user, current) => {
        return { ...user, [`${current[0]}`]: current[1].value };
      }, {});
    else if (!nameIsValid) nameInputRef.current.focus();
    else if (!emailIsValid) emailInputRef.current.focus();
    else if (!passwordIsValid) passwordConfirmInputRef.current.focus();
    else if (!passwordConfirmIsValid) passwordConfirmInputRef.current.focus();

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
      console.log(user);

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

      <h2 className={styles['signin__header']}>Create an Account</h2>

      <form onSubmit={formSubmitHandler}>
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
          invalidMessage='Password length must be greater than 8 characters.'
          value={userInfo.password.value}
          onChange={userInfoOnChangeHandler}
          onBlur={userInfoOnChangeHandler}
          showValid={true}
        />

        <Input
          ref={passwordConfirmInputRef}
          id='passwordConfirm'
          label='Confirm Password'
          type='password'
          isValid={passwordConfirmIsValid}
          invalidMessage='Password does not match.'
          value={userInfo.passwordConfirm.value}
          onChange={userInfoOnChangeHandler}
          onBlur={userInfoOnChangeHandler}
          showValid={true}
        />

        <button className={styles.submit}>Sign Up</button>
      </form>

      <p className={styles['redirect--signin']}>
        Already a user? <Link to='/signin'>Log In</Link>
      </p>

      <p className={styles.footer}>
        &copy; 2022 FindRecipe Ltd. All Rights Reserved.
      </p>
    </section>
  );
};

export default Signin;
