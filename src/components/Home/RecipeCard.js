import React from 'react';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe, type }) => {
  const navigate = useNavigate();

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

  const recipeId = uri.slice(uri.indexOf('_') + 1);

  const slug = slugify(label, { lower: true, remove: /[*+~.()'"!:@]/g });

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

  const onClickRecipe = (e) => {
    navigate(`/recipe/${type.toLowerCase()}/${slug}/${recipeId}`, {
      replace: true,
    });
  };

  return (
    <li className={styles['recipe-card']}>
      <div
        className={styles['recipe-card__container--image']}
        onClick={onClickRecipe}
      >
        <img src={image} alt={label} />
      </div>
      <div className={styles['recipe-card__container--texts']}>
        {renderDietLabels()}

        <p className={styles['recipe-card__name']} onClick={onClickRecipe}>
          {label}
        </p>

        <div className={styles['recipe-card__list--detail']}>
          {renderCaloriesDetails()}
          {renderIngredientsQuantity()}
        </div>
      </div>
    </li>
  );
};

export default RecipeCard;
