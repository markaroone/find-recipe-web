import React from 'react';
import styles from './RelatedContent.module.css';
import RecipeCard from '../Home/RecipeCard';
import RecipeCardSkeleton from '../Home/RecipeCardSkeleton';
import Skeleton from 'react-loading-skeleton';

const RelatedContent = ({ relatedRecipes, type }) => {
  return (
    <div className={styles['recipe__container--related']}>
      {relatedRecipes.length > 0 ? (
        <h2>More {type} Recipes</h2>
      ) : (
        <Skeleton width={156} />
      )}
      <ul className={styles['recipe__list--related']}>
        {relatedRecipes.length <= 0 &&
          [...new Array(3)].map((_, i) => <RecipeCardSkeleton key={i} />)}

        {relatedRecipes.length > 0 &&
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
