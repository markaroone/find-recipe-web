import React, { useState, useEffect, useRef, useContext } from 'react';
import Logo from '../components/Logo/Logo';
import Input from '../components/UI/Input/Input';
import styles from './Signin.module.css';
import validator from 'validator';

const MIN_PASSWORD_LENGTH = 8;

const Signin = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();

  const [userInfo, setUserInfo] = useState({
    name: { value: '', isValid: null },
    email: { value: '', isValid: null },
    password: { value: '', isValid: null },
    passwordConfirm: { value: '', isValid: null },
  });

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

    if (type === 'email') return validator.isEmail(value);
    if (type === 'password') return value.length >= MIN_PASSWORD_LENGTH;

    if (type === 'passwordConfirm' && !origPassword) return false;
    else if (type === 'passwordConfirm' && origPassword)
      return value === origPassword;
  };

  const { isValid: nameIsValid } = userInfo.name;
  const { isValid: emailIsValid } = userInfo.email;

  return (
    <section className={styles.signin}>
      <Logo />

      <h2>Create an Account</h2>

      <form>
        <Input
          ref={nameInputRef}
          id='name'
          label='Name'
          type='input'
          isValid={nameIsValid}
          value={userInfo.name.value}
          onChange={userInfoOnChangeHandler}
        />

        <Input
          ref={nameInputRef}
          id='email'
          label='Email'
          type='email'
          isValid={emailIsValid}
          value={userInfo.email.value}
          onChange={userInfoOnChangeHandler}
          onBlur={userInfoOnChangeHandler}
        />
      </form>
    </section>
  );
};

export default Signin;
