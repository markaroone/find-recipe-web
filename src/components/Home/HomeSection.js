import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import RecipeCarousel from './RecipeCarousel';
import styles from './HomeSection.module.css';
import axios from 'axios';
import RecipeList from './RecipeList';
import edamam from '../../assets/data/edamam.json';
import { resolvePath } from 'react-router-dom';

const firstFood = 'Burger';

export const fetchRecipeStatus = {
  FETCHING: 'fetching',
  LOADED: 'loaded',
  ERROR_FETCH: 'error-fetch',
};

const simulateFetch = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(edamam);
    }, seconds * 1000);
  });
};

const Home = () => {
  const [recipes, setRecipes] = useState({
    status: fetchRecipeStatus.FETCHING,
    search: firstFood,
    recipes: {},
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [previousLink, setPreviousLink] = useState('');
  const [nextLink, setNextLink] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const getRecipes = async (food) => {
    setRecipes((prev) => ({
      ...prev,
      status: fetchRecipeStatus.FETCHING,
      search: food,
    }));

    try {
      const { data } = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=aa145f41&app_key=a8cc1865f185e28cb340c004b2b49d1e&field=label&field=image&field=calories&field=cuisineType&field=dietLabels&field=source&field=url&field=totalTime&field=uri&field=yield&field=ingredients`
      );

      setRecipes((prev) => ({
        ...prev,
        status: fetchRecipeStatus.LOADED,
        recipes: { ...data },
      }));

      setRecipes((prev) => ({
        ...prev,
        status: fetchRecipeStatus.LOADED,
        recipes: { ...data },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const initRecipes = async (food) => {
    setRecipes((prev) => ({
      ...prev,
      status: fetchRecipeStatus.FETCHING,
      search: food,
    }));

    try {
      const data = await simulateFetch(2);

      setRecipes((prev) => ({
        ...prev,
        status: fetchRecipeStatus.LOADED,
        recipes: { ...data },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const updatePageNumberHandler = () => {};

  useEffect(() => {
    initRecipes(firstFood);
  }, []);

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  return (
    <section className={styles.home}>
      <SearchBar food={recipes.search} searchRecipeHandler={getRecipes} />
      <RecipeCarousel searchRecipeHandler={getRecipes} />
      {recipes.status === fetchRecipeStatus.FETCHING && 'Loading'}
      {recipes.status === fetchRecipeStatus.LOADED && (
        <RecipeList recipes={recipes} />
      )}
    </section>
  );
};

export default Home;
