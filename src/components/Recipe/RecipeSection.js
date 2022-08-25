import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainContent from './MainContent';
import MainContentSkeleton from './MainContentSkeleton';
import styles from './RecipeSection.module.css';
import RelatedContent from './RelatedContent';
import useHttp from '../../hooks/useHttp';
import { singleRecipeUrl, multipleRecipesUrl } from '../../api/edamam';

const CODES = {
  ERR_NETWORK: ['ERR_NETWORK', 'Network Error'],
  _404: ['NO RECIPE FOUND'],
  _429: ['TOO MANY REQUEST', 'Same as network error'],
};

const RecipeSection = () => {
  const { type, id, slug } = useParams();
  const singleUrl = singleRecipeUrl.replace('<ID>', id);
  const relatedUrl = multipleRecipesUrl.replace('<TYPE>', type);

  const {
    data: singleRecipeData,
    isLoading: singleRecipeIsLoading,
    error: singleRecipeError,
    requestData: requestSingleRecipe,
  } = useHttp(singleUrl);

  singleRecipeError && console.log(singleRecipeError);

  const {
    data: relatedRecipes,
    isLoading: relatedRecipesIsLoading,
    error: relatedRecipesError,
    requestData: requestRelatedRecipes,
  } = useHttp(relatedUrl);

  useEffect(() => {
    requestSingleRecipe();
    requestRelatedRecipes();
  }, [slug]);

  const renderSingleRecipe = () => {
    if (singleRecipeIsLoading === false && singleRecipeError === null)
      return <MainContent recipe={singleRecipeData.data.recipe} />;

    if (singleRecipeIsLoading) return <MainContentSkeleton />;
  };

  const renderRelatedRecipe = () => {
    if (singleRecipeError === null && relatedRecipesError === null)
      return (
        <RelatedContent
          relatedRecipes={relatedRecipes?.data?.hits}
          type={type}
          isLoading={
            relatedRecipesIsLoading === null || relatedRecipesIsLoading
          }
        />
      );
  };
  return (
    <section className={styles.recipe}>
      {renderSingleRecipe()}
      {renderRelatedRecipe()}
    </section>
  );
};

export default RecipeSection;
