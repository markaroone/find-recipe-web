import React from 'react';
import styles from './MainContent.module.css';

const MainContent = ({ recipe }) => {
  return (
    <div className={styles['recipe__container--content']}>
      <h1 className={styles['recipe__title']}>{recipe.label}</h1>

      <div className={styles['recipe__container--image']}>
        <img
          src={recipe.images.LARGE?.url || recipe.image}
          alt={recipe.label}
        />
      </div>

      <div className={styles['recipe__container--section']}>
        <h4>Ingredients</h4>
        <ul className={styles['recipe__list--ingredients']}>
          {recipe.ingredients.map((el, i) => (
            <li key={i} className={styles['recipe__item--ingredients']}>
              {el.text}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles['recipe__container--section']}>
        <h4>Preparation</h4>
        <div className={styles['recipe__container--instructions']}>
          <a
            href={recipe.url}
            className={styles['recipe__btn-link--instruction']}
          >
            Instructions
          </a>
          <p>
            by{' '}
            <a
              href={recipe.url}
              className={styles['recipe__link--instructions']}
            >
              {recipe.source}
            </a>
          </p>
        </div>
      </div>

      <div className={styles['recipe__container--section']}>
        <h4>Nutrition</h4>
        <ul className={styles['recipe__list--nutrition']}>
          <li className={styles['recipe__item--nutrition']}>
            <p>
              {(+(recipe.calories / recipe.yield).toFixed()).toLocaleString(
                'en-US'
              )}
            </p>
            <small>CAL/SERV</small>
          </li>

          <li className={styles['recipe__item--nutrition']}>
            <p>{(+recipe.calories.toFixed()).toLocaleString('en-US')}</p>
            <small>TOTAL CAL</small>
          </li>

          <li className={styles['recipe__item--nutrition']}>
            <p>{recipe.yield}</p>
            <small>{recipe.yield > 1 ? 'SERVINGS' : 'SERVING'}</small>
          </li>
        </ul>
      </div>

      <div className={styles['recipe__container--section']}>
        <h4>Health Labels</h4>
        <ul className={styles['recipe__list--health-labels']}>
          {recipe.healthLabels.map((el, i) => (
            <li key={i} className={styles['recipe__item--health-labels']}>
              {el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainContent;
