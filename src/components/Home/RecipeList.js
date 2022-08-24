import React from 'react';
import RecipeCard from './RecipeCard';
import RecipeCardSkeleton from './RecipeCardSkeleton';
import styles from './RecipeList.module.css';

const RecipeList = ({ recipes, isLoading }) => {
  const count = recipes.recipes.count?.toLocaleString();

  return (
    <div className={styles['recipe-list__container']}>
      {!isLoading && (
        <p className={styles['recipe-list__title--search-status']}>
          {count} matching results for <i>"{recipes.search}"</i>
        </p>
      )}
      {isLoading && (
        <p className={styles['recipe-list__title--search-status']}>
          Searching for <i>"{recipes.search}"</i>
        </p>
      )}

      <ul className={styles['recipe-list__list']}>
        {isLoading &&
          [...new Array(20)].map((_, i) => <RecipeCardSkeleton key={i} />)}

        {!isLoading &&
          recipes.recipes.hits.map((recipe, i) => (
            <RecipeCard key={i} recipe={recipe.recipe} type={recipes.search} />
          ))}
      </ul>
    </div>
  );
};

export default RecipeList;
