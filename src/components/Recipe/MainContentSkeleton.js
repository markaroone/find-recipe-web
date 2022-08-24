import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './MainContentSkeleton.module.css';

const MainContentSkeleton = () => {
  return (
    <div className={styles['recipe__container--content']}>
      <h1 className={styles['recipe__title']}>
        <Skeleton count={2} />
      </h1>

      <div className={styles['recipe__container--image']}>
        <Skeleton />
      </div>

      <div className={styles['recipe__container--section']}>
        <h4>
          <Skeleton />
        </h4>
        <ul className={styles['recipe__list--ingredients']}>
          {[...new Array(5)].map((_, i) => (
            <li key={i} className={styles['recipe__item--ingredients']}>
              <Skeleton />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles['recipe__container--section']}>
        <h4>
          <Skeleton />
        </h4>
        <div className={styles['recipe__container--instructions']}>
          <a href='/' className={styles['recipe__btn-link--instruction']}>
            <Skeleton />
          </a>
          <p>
            <Skeleton />
          </p>
        </div>
      </div>

      <div className={styles['recipe__container--section']}>
        <h4>
          <Skeleton />
        </h4>
        <ul className={styles['recipe__list--nutrition']}>
          <li className={styles['recipe__item--nutrition']}>
            <p>
              <Skeleton />
            </p>
            <small>
              <Skeleton />
            </small>
          </li>

          <li className={styles['recipe__item--nutrition']}>
            <p>
              <Skeleton />
            </p>
            <small>
              <Skeleton />
            </small>
          </li>

          <li className={styles['recipe__item--nutrition']}>
            <p>
              <Skeleton />
            </p>
            <small>
              <Skeleton />
            </small>
          </li>
        </ul>
      </div>

      <div className={styles['recipe__container--section']}>
        <h4>
          <Skeleton />
        </h4>
        <ul className={styles['recipe__list--health-labels']}>
          {[...new Array(20)].map((_, i) => (
            <li key={i} className={styles['recipe__item--health-labels']}>
              <Skeleton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainContentSkeleton;
