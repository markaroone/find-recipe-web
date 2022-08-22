import React from 'react';
import RecipeCard from './RecipeCard';
import styles from './RecipeList.module.css';

const RecipeList = ({ recipes }) => {
  const count = recipes.recipes.count.toLocaleString();
  return (
    <div className={styles['recipe-list__container']}>
      <p className={styles['recipe-list__title--search-status']}>
        {count} matching results for <i>"{recipes.search}"</i>
      </p>

      <ul className={styles['recipe-list__list']}>
        {recipes.recipes.hits.map((recipe, i) => (
          <RecipeCard key={i} recipe={recipe.recipe} />
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
