import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import RecipeCarousel from './RecipeCarousel';
import styles from './HomeSection.module.css';
import axios from 'axios';
import RecipeList from './RecipeList';
import edamamData from '../../assets/data/edamamData.json';
import Pagination from './Pagination';

const firstFood = 'Sushi';

const scrollTo = (ref) => {
  return ref.current.scrollIntoView({ behavior: 'smooth' });
};

const edamamBaseUrl =
  'https://api.edamam.com/api/recipes/v2?type=public&app_id=aa145f41&app_key=a8cc1865f185e28cb340c004b2b49d1e&field=label&field=image&field=calories&field=cuisineType&field=dietLabels&field=source&field=url&field=totalTime&field=uri&field=yield&field=ingredients';

export const fetchRecipeStatus = {
  FETCHING: 'fetching',
  LOADED: 'loaded',
  ERROR_FETCH: 'error-fetch',
};

const simulateFetch = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(edamamData);
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
  const [previousLink, setPreviousLink] = useState(null);

  const [previousLinks, setPreviousLinks] = useState([]);
  const [currentLink, setCurrentLink] = useState(`&q=${firstFood}`);
  const [nextLink, setNextLink] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const recipeListRef = useRef();

  const getRecipes = async (food) => {
    setRecipes((prev) => ({
      ...prev,
      status: fetchRecipeStatus.FETCHING,
      search: food,
    }));

    setPageNumber(1);

    try {
      const { data } = await axios.get(`${edamamBaseUrl}&q=${food}`);

      setRecipes((prev) => ({
        ...prev,
        status: fetchRecipeStatus.LOADED,
        recipes: { ...data },
      }));

      setNextLink(getShortenedNextUrl(data._links.next.href));

      setRecipes((prev) => ({
        ...prev,
        status: fetchRecipeStatus.LOADED,
        recipes: { ...data },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const nextRecipes = async (link) => {
    setRecipes((prev) => ({
      ...prev,
      status: fetchRecipeStatus.FETCHING,
    }));

    try {
      const { data } = await axios.get(link);

      setRecipes((prev) => ({
        ...prev,
        status: fetchRecipeStatus.LOADED,
        recipes: { ...data },
      }));

      setPreviousLinks((prev) => {
        const previous = [...prev];
        previous.push(currentLink);
        return previous;
      });

      setPreviousLink(currentLink);

      setCurrentLink(nextLink);

      setNextLink(getShortenedNextUrl(data._links.next.href));

      setRecipes((prev) => ({
        ...prev,
        status: fetchRecipeStatus.LOADED,
        recipes: { ...data },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const prevRecipes = async (link) => {
    setRecipes((prev) => ({
      ...prev,
      status: fetchRecipeStatus.FETCHING,
    }));

    try {
      const { data } = await axios.get(link);

      setRecipes((prev) => ({
        ...prev,
        status: fetchRecipeStatus.LOADED,
        recipes: { ...data },
      }));

      setPreviousLink(previousLinks[pageNumber - 2]);

      setCurrentLink(nextLink);

      setNextLink(data._links.next.href);

      pageNumber >= previousLink.length && setPreviousLink();

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

      setPreviousLink(
        pageNumber === 1 ? [`&q=${food}`] : previousLink[pageNumber + 1]
      );

      setNextLink(getShortenedNextUrl(data._links.next.href));
    } catch (error) {
      console.log(error);
    }
  };

  const getShortenedNextUrl = (url) =>
    url.slice(url.indexOf('_cont'), url.indexOf('&type'));

  const onNextPageHandler = () => {
    nextRecipes(`${edamamBaseUrl}&${nextLink}&q=${recipes.search}`);
    setPageNumber((prev) => prev + 1);
    scrollTo(recipeListRef);
  };

  const onPrevPageHandler = () => {
    if (pageNumber - 1 <= 0) return;

    prevRecipes(`${edamamBaseUrl}&${previousLink}&q=${recipes.search}`);
    setPageNumber((prev) => prev - 1);
    scrollTo(recipeListRef);
  };

  useEffect(() => {
    (async () => {
      // await initRecipes(firstFood);
      await getRecipes(firstFood);
    })();
  }, []);

  useEffect(() => {
    // console.log(recipes);
  }, [recipes]);

  return (
    <section className={styles.home}>
      <SearchBar food={recipes.search} searchRecipeHandler={getRecipes} />
      <RecipeCarousel searchRecipeHandler={getRecipes} />
      <RecipeList
        ref={recipeListRef}
        recipes={recipes}
        isLoading={recipes.status === fetchRecipeStatus.FETCHING}
      />
      <Pagination
        currentPage={pageNumber}
        onNextPage={onNextPageHandler}
        onPreviousPage={onPrevPageHandler}
      />
    </section>
  );
};

export default Home;
