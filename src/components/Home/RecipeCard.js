import React from 'react';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe }) => {
  const {
    image,
    label,
    calories,
    source,
    url,
    uri,
    totalTime,
    yield: servings,
    ingredients,
  } = recipe;

  let caloriesPerServing = (calories / servings).toFixed();

  let dietLabels =
    recipe.dietLabels.length > 0 ? recipe.dietLabels : ['non-dietary'];

  const renderDietLabels = () => {
    return (
      <ul className={styles['recipe-card__list--diet-label']}>
        <li
          className={`${styles['recipe-card__item--diet-label']} ${
            styles[`${dietLabels[0].toLowerCase()}`]
          }`}
        >
          {dietLabels[0]}
        </li>
        {recipe.dietLabels.length > 1 && (
          <li
            className={`${styles['recipe-card__item--diet-label']} ${
              styles[`${dietLabels[1].toLowerCase()}`]
            }`}
          >
            {dietLabels[1]}
          </li>
        )}
      </ul>
    );
  };

  const renderCaloriesDetails = () => {
    return (
      <div className={styles['recipe-card__detail']}>
        <i>
          <ion-icon name='flame-sharp'></ion-icon>
        </i>
        <p>{caloriesPerServing} calories</p>
      </div>
    );
  };

  const renderIngredientsQuantity = () => (
    <div className={styles['recipe-card__detail']}>
      <i>
        <ion-icon name='restaurant-outline'></ion-icon>
      </i>
      <p>{ingredients.length} ingredients</p>
    </div>
  );

  return (
    <li className={styles['recipe-card']}>
      <div className={styles['recipe-card__container--image']}>
        <img src={image} alt={label} />
      </div>
      <div className={styles['recipe-card__container--texts']}>
        {renderDietLabels()}

        <p className={styles['recipe-card__name']}>{label}</p>

        <div className={styles['recipe-card__list--detail']}>
          {renderCaloriesDetails()}
          {renderIngredientsQuantity()}
        </div>
      </div>
    </li>
  );
};

export default RecipeCard;
