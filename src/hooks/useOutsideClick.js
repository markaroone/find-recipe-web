import React, { useEffect } from 'react';

const useOutsideClick = (ref, fn) => {
  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        fn();
      }
    };

    document.addEventListener('click', outsideClickHandler);

    return () => document.removeEventListener('click', outsideClickHandler);
  }, [ref]);
};

export default useOutsideClick;
