import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RecipeCard from '../Home/RecipeCard';
import styles from './RecipeSection.module.css';

const baseUrl =
  'https://api.edamam.com/api/recipes/v2/<ID>?type=public&app_id=aa145f41&app_key=a8cc1865f185e28cb340c004b2b49d1e';

const baseUrlAll =
  'https://api.edamam.com/api/recipes/v2?type=public&app_id=aa145f41&app_key=a8cc1865f185e28cb340c004b2b49d1e&field=label&field=image&field=calories&field=cuisineType&field=dietLabels&field=source&field=url&field=totalTime&field=uri&field=yield&field=ingredients&random=true&q=<TYPE>';

const RecipeSection = () => {
  const { type, id, slug } = useParams();

  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);

  const getRecipeDetails = async () => {
    try {
      setIsLoading(true);
      const url = baseUrl.replace('<ID>', id);

      const relatedUrl = baseUrlAll.replace('<TYPE>', type);

      const {
        data: { recipe },
      } = await axios.get(url);

      const {
        data: { hits },
      } = await axios.get(relatedUrl);

      setRecipe(recipe);
      setRelatedRecipes(hits);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipeDetails();
  }, []);

  useEffect(() => {
    getRecipeDetails();
  }, [id]);

  return (
    <section className={styles.recipe}>
      {recipe && (
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
      )}

      {relatedRecipes.length > 0 && (
        <div className={styles['recipe__container--related']}>
          <h2>More {type} Recipes</h2>
          <ul className={styles['recipe__list--related']}>
            {relatedRecipes.slice(0, 3).map((el, i) => (
              <RecipeCard key={i} recipe={el.recipe} type={type} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default RecipeSection;
