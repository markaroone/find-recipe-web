import React, { useEffect, useState, useContext } from 'react';
import styles from './SearchBar.module.css';
import axios from 'axios';
import UserContext from '../../context/UserProvider';

const SearchBar = ({ food, searchRecipeHandler }) => {
  const [recipeToFind, setRecipeToFind] = useState(food);

  const inputOnChangeHandler = (e) => {
    setRecipeToFind(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    searchRecipeHandler(recipeToFind);
  };

  useEffect(() => {
    setRecipeToFind(food);
  }, [food]);

  return (
    <form className={styles['search-bar']} onSubmit={onSubmitHandler}>
      <h1>What do you want to eat?</h1>

      <div className={styles['search-bar__container--input']}>
        <button>
          <ion-icon name='search-outline'></ion-icon>
        </button>

        <input
          type='text'
          onChange={inputOnChangeHandler}
          value={recipeToFind}
        />
      </div>
    </form>
  );
};

export default SearchBar;
