import React, { useState, useRef, useImperativeHandle } from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  let type = props.type;

  if (showPassword) type = 'text';

  const renderPasswordShowIcon = () => {
    const showIcon = props.type === 'password' && props.value.length > 0;
    const eyeIcon = showPassword ? 'eye-outline' : 'eye-off-outline';
    return (
      showIcon && (
        <button
          type='button'
          className={styles['control__icon--show-password']}
          onClick={toggleShowPasswordHandler}
        >
          <ion-icon name={eyeIcon}></ion-icon>
        </button>
      )
    );
  };

  const renderInvalidMessage = () =>
    props.isValid === false && (
      <p className={styles.message}>{props.invalidMessage}</p>
    );

  return (
    <div
      className={`${styles.control} ${
        props.isValid === false ? styles.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>
        {props.showValid && props.isValid && (
          <i>
            <ion-icon name='checkmark-circle'></ion-icon>
          </i>
        )}
        <p>{props.label} </p>
      </label>

      <div className={styles['control__input--container']}>
        <input
          ref={inputRef}
          type={type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
          onFocus={props.onFocus}
        />

        {renderPasswordShowIcon()}
      </div>

      {renderInvalidMessage()}
    </div>
  );
});

export default Input;
