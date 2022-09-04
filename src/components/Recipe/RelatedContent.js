import React, { memo, useEffect } from 'react';

import { useParams, useLocation } from 'react-router-dom';

import RecipeCard from '../Home/RecipeCard';
import RecipeCardSkeleton from '../Home/RecipeCardSkeleton';
import Skeleton from 'react-loading-skeleton';
import useHttp from '../../hooks/useHttp';
import { multipleRecipesUrl } from '../../api/edamam';
import styles from './RelatedContent.module.css';

const RelatedContent = () => {
  const { type } = useParams();
  const location = useLocation();

  const relatedUrl = multipleRecipesUrl.replace('<TYPE>', type);

  const { data, isLoading, requestData } = useHttp(
    relatedUrl,
    'get',
    null,
    false,
    true
  );

  useEffect(requestData, [location]);

  return (
    <div className={styles['recipe__container--related']}>
      {isLoading === false ? (
        <h2>More {type} Recipes</h2>
      ) : (
        <Skeleton width={156} />
      )}
      <ul className={styles['recipe__list--related']}>
        {(isLoading === null || isLoading) &&
          [...new Array(3)].map((_, i) => <RecipeCardSkeleton key={i} />)}

        {isLoading === false &&
          data?.data?.hits
            .slice(0, 3)
            .map((el, i) => (
              <RecipeCard key={i} recipe={el.recipe} type={type} />
            ))}
      </ul>
    </div>
  );
};

export default memo(RelatedContent);
