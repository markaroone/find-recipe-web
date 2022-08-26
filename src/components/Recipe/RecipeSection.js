import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainContent from './MainContent';
import MainContentSkeleton from './MainContentSkeleton';
import styles from './RecipeSection.module.css';
import RelatedContent from './RelatedContent';
import useHttp from '../../hooks/useHttp';
import { singleRecipeUrl, multipleRecipesUrl } from '../../api/edamam';
import SomethingWentWrong from '../UI/Message/SomethingWentWrong';

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
          relatedRecipes={relatedRecipes?.data?.hits.slice(17, 20)}
          type={type}
          isLoading={
            relatedRecipesIsLoading === null || relatedRecipesIsLoading
          }
        />
      );
  };

  const renderErrorMessage = () => {
    if (singleRecipeError) return <SomethingWentWrong />;
  };
  return (
    <section className={styles.recipe}>
      {renderSingleRecipe()}
      {renderRelatedRecipe()}
      {renderErrorMessage()}
    </section>
  );
};

export default RecipeSection;
