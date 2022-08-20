import React, { useRef, useImperativeHandle } from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

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
        <p>{props.label}</p>
      </label>

      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />

      {props.isValid === false && (
        <p className={styles.message}>{props.invalidMessage}</p>
      )}
    </div>
  );
});

export default Input;
