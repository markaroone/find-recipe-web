import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import RecipeCarousel from './RecipeCarousel';
import styles from './HomeSection.module.css';
import axios from 'axios';

const firstFood = 'Chicken';

export const fetchRecipeStatus = {
  FETCHING: 'fetching',
  LOADED: 'loaded',
  ERROR_FETCH: 'error-fetch',
};

const Home = () => {
  const [recipes, setRecipes] = useState({
    status: fetchRecipeStatus.FETCHING,
    search: firstFood,
    recipes: {},
  });

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
    // getRecipes(firstFood);
  }, []);

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  return (
    <section className={styles.home}>
      <SearchBar food={recipes.search} searchRecipeHandler={getRecipes} />
      <RecipeCarousel searchRecipeHandler={getRecipes} />
      {recipes.status === fetchRecipeStatus.FETCHING && 'Loading'}
    </section>
  );
};

export default Home;
