import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RecipeCard from '../Home/RecipeCard';
import RecipeCardSkeleton from '../Home/RecipeCardSkeleton';
import MainContent from './MainContent';
import MainContentSkeleton from './MainContentSkeleton';
import styles from './RecipeSection.module.css';
import RelatedContent from './RelatedContent';

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
      {recipe && <MainContent recipe={recipe} />}
      {!recipe && <MainContentSkeleton />}

      {<RelatedContent relatedRecipes={relatedRecipes} type={type} />}
    </section>
  );
};

export default RecipeSection;
