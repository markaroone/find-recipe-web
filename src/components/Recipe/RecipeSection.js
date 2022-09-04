import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainContent from './MainContent';
import MainContentSkeleton from './MainContentSkeleton';
import styles from './RecipeSection.module.css';
import RelatedContent from './RelatedContent';
import useHttp from '../../hooks/useHttp';
import { singleRecipeUrl } from '../../api/edamam';
import SomethingWentWrong from '../UI/Message/SomethingWentWrong';

const RecipeSection = () => {
  const { id, slug } = useParams();
  const singleUrl = singleRecipeUrl.replace('<ID>', id);

  const {
    data: singleRecipeData,
    isLoading: singleRecipeIsLoading,
    error: singleRecipeError,
    requestData: requestSingleRecipe,
  } = useHttp(singleUrl);

  useEffect(() => {
    requestSingleRecipe();
  }, [slug]);

  const renderSingleRecipe = () => {
    if (singleRecipeIsLoading === false && singleRecipeError === null)
      return <MainContent recipe={singleRecipeData.data.recipe} />;

    if (singleRecipeIsLoading) return <MainContentSkeleton />;
  };

  const renderRelatedRecipe = () => {
    if (singleRecipeError === null) return <RelatedContent />;
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
