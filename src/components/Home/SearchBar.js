import React, { useEffect, useState, useContext } from 'react';
import styles from './SearchBar.module.css';
import axios from 'axios';
import UserContext from '../../context/UserProvider';

const SearchBar = () => {
  const { recipes, setRecipes } = useContext(UserContext);
  const [recipeToFind, setRecipeToFind] = useState('');

  useEffect(() => {
    setRecipeToFind(recipes.search);
  }, [recipes]);

  const inputOnChangeHandler = (e) => {
    setRecipeToFind(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setRecipes((prev) => ({ ...prev, search: recipeToFind }));
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=aa145f41&app_key=a8cc1865f185e28cb340c004b2b49d1e`
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles['search-bar']} onSubmit={onSubmitHandler}>
      <h1>What do you want to eat?</h1>

      <input type='text' onChange={inputOnChangeHandler} value={recipeToFind} />

      <button>
        <ion-icon name='search'></ion-icon>
      </button>
    </form>
  );
};

export default SearchBar;
