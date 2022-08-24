import React from 'react';
import styles from './RelatedContent.module.css';
import RecipeCard from '../Home/RecipeCard';
import RecipeCardSkeleton from '../Home/RecipeCardSkeleton';
import Skeleton from 'react-loading-skeleton';

const RelatedContent = ({ relatedRecipes, type, isLoading }) => {
  return (
    <div className={styles['recipe__container--related']}>
      {!isLoading ? <h2>More {type} Recipes</h2> : <Skeleton width={156} />}
      <ul className={styles['recipe__list--related']}>
        {isLoading &&
          [...new Array(3)].map((_, i) => <RecipeCardSkeleton key={i} />)}

        {!isLoading &&
          relatedRecipes
            .slice(0, 3)
            .map((el, i) => (
              <RecipeCard key={i} recipe={el.recipe} type={type} />
            ))}
      </ul>
    </div>
  );
};

export default RelatedContent;
