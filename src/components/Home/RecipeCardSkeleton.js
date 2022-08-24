import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './RecipeCardSkeleton.module.css';

const RecipeCardSkeleton = () => {
  return (
    <li className={styles['card-skeleton']}>
      <div className={styles['recipe-card__container--image']}>
        <Skeleton height='100%' />
      </div>

      <div className={styles['recipe-card__container--texts']}>
        <ul className={styles['recipe-card__list--diet-label']}>
          <li className={styles['recipe-card__item--diet-label']}>
            <Skeleton borderRadius={1000} />
          </li>
          <li className={styles['recipe-card__item--diet-label']}>
            <Skeleton borderRadius={1000} />
          </li>
        </ul>

        <p className={styles['recipe-card__name']}>
          <Skeleton count={2} />
        </p>

        <div className={styles['recipe-card__list--detail']}>
          <div className={styles['recipe-card__detail']}>
            <i>
              <Skeleton circle={true} width='2.4rem' height='2.4rem' />
            </i>
            <p>
              <Skeleton />
            </p>
          </div>

          <div className={styles['recipe-card__detail']}>
            <i>
              <Skeleton circle={true} width='2.4rem' height='2.4rem' />
            </i>
            <p>
              <Skeleton />
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RecipeCardSkeleton;
