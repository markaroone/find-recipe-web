import React, { useState, useEffect, useContext } from 'react';
import SearchBar from './SearchBar';
import styles from './HomeSection.module.css';
import UserContext from '../../context/UserProvider';
import { fetchRecipeStatus } from '../../context/RecipesListProvider';
import axios from 'axios';

const firstFood = 'chicken';

const Home = () => {
  const { recipes, setRecipes } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const getRecipes = async (food) => {
    setRecipes((prev) => ({
      ...prev,
      status: fetchRecipeStatus.FETCHING,
      search: food,
    }));

    try {
      const { data } = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=aa145f41&app_key=a8cc1865f185e28cb340c004b2b49d1e`
      );

      setRecipes((prev) => ({
        ...prev,
        status: fetchRecipeStatus.LOADED,
        recipes: { ...data },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipes(firstFood);
  }, []);

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  return (
    <section className={styles.home}>
      <SearchBar />
      {recipes.status === fetchRecipeStatus.FETCHING && 'Loading'}
    </section>
  );
};

export default Home;
