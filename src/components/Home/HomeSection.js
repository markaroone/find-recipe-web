import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import RecipeCarousel from './RecipeCarousel';
import styles from './HomeSection.module.css';
import axios from 'axios';
import RecipeList from './RecipeList';
import Pagination from './Pagination';
import { multipleNonRandomRecipesUrl } from '../../api/edamam';
import SomethingWentWrong from '../UI/Message/SomethingWentWrong';

const FIRST_SEARCH = 'Pasta';

const scrollTo = (ref) => {
  return ref.current.scrollIntoView({ behavior: 'smooth' });
};

export const fetchRecipeStatus = {
  FETCHING: 'fetching',
  LOADED: 'loaded',
  ERROR_FETCH: 'error-fetch',
};

const Home = () => {
  const [recipes, setRecipes] = useState({
    status: fetchRecipeStatus.FETCHING,
    search: FIRST_SEARCH,
    recipes: {},
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [previousLink, setPreviousLink] = useState(null);
  const [previousLinks, setPreviousLinks] = useState([]);
  const [currentLink, setCurrentLink] = useState(`&q=${FIRST_SEARCH}`);
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
      const { data } = await axios.get(
        `${multipleNonRandomRecipesUrl}&q=${FIRST_SEARCH}`
      );

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
      setErrorMessage(error);
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
      setErrorMessage(error);
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
      setErrorMessage(error);
    }
  };

  const getShortenedNextUrl = (url) =>
    url.slice(url.indexOf('_cont'), url.indexOf('&type'));

  const onNextPageHandler = () => {
    nextRecipes(
      `${multipleNonRandomRecipesUrl}&${nextLink}&q=${recipes.search}`
    );
    setPageNumber((prev) => prev + 1);
    scrollTo(recipeListRef);
  };

  const onPrevPageHandler = () => {
    if (pageNumber - 1 <= 0) return;

    prevRecipes(
      `${multipleNonRandomRecipesUrl}&${previousLink}&q=${recipes.search}`
    );
    setPageNumber((prev) => prev - 1);
    scrollTo(recipeListRef);
  };

  useEffect(() => {
    return () => {
      (async () => {
        await getRecipes('Pasta');
      })();
    };
  }, []);

  return (
    <section className={styles.home}>
      {!errorMessage && (
        <>
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
        </>
      )}

      {errorMessage && <SomethingWentWrong />}
    </section>
  );
};

export default Home;
