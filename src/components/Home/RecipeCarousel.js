import React, { useState, useEffect } from 'react';
import styles from './RecipeCarousel.module.css';
import useWidth from '../../hooks/useWidth';
import carouselData from '../../assets/data/carouselData.json';

const breakpoints = [
  { width: 1440, itemsToShow: 6 },
  {
    width: 1300,
    itemsToShow: 4,
  },
  {
    width: 926,
    itemsToShow: 3,
  },
  {
    width: 550,
    itemsToShow: 2,
  },
  {
    width: 1,
    itemsToShow: 1,
  },
];

const groupItems = (items, size) => {
  const output = [];
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    output.push(chunk);
  }
  return output.reverse();
};

const RecipeCarousel = ({ searchRecipeHandler }) => {
  const screenWidth = useWidth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(2);
  const [numCardsPerSlide, setNumCardsPerSlide] = useState(6);

  const autoFitCarouselHandler = () => {
    breakpoints.forEach((el) => {
      el.width >= screenWidth && setNumCardsPerSlide(el.itemsToShow);
    });
  };

  const onClickCardHandler = (e) => {
    let cardId = e.target.parentElement.id;

    cardId = cardId[0].toUpperCase() + cardId.slice(1);

    searchRecipeHandler(cardId);
  };

  const slideMoveHandler = (e) => {
    const buttonId = e.target.parentElement.id;
    if (buttonId === 'prev' && currentSlide > 0)
      setCurrentSlide(currentSlide - 1);

    if (buttonId === 'next' && currentSlide < maxSlide - 1)
      setCurrentSlide(currentSlide + 1);
  };

  const items = carouselData.map((el, i) => (
    <li
      key={i}
      id={el.name}
      className={styles['recipe-carousel__card']}
      onClick={onClickCardHandler}
    >
      <img src={`${el.image}`} alt={`${el.name}`} />
      <p>{el.name}</p>
    </li>
  ));

  useEffect(() => {
    autoFitCarouselHandler();
  }, [screenWidth]);

  useEffect(() => {
    setMaxSlide(carouselData.length / numCardsPerSlide);
  }, [numCardsPerSlide, screenWidth]);

  return (
    <div className={styles['recipe-carousel']}>
      <ul className={styles['recipe-carousel__list']}>
        {groupItems(items, numCardsPerSlide).map((el, i) => (
          <div
            key={i}
            style={{ transform: `translateX(${i - currentSlide}00%)` }}
            className={styles['recipe-carousel__item']}
          >
            {el}
          </div>
        ))}
      </ul>
      <button
        id='prev'
        className={styles['recipe-carousel__button--prev']}
        onClick={slideMoveHandler}
      >
        <ion-icon name='chevron-back-sharp'></ion-icon>
      </button>

      <button
        id='next'
        className={styles['recipe-carousel__button--next']}
        onClick={slideMoveHandler}
      >
        <ion-icon name='chevron-forward-sharp'></ion-icon>
      </button>
    </div>
  );
};

export default RecipeCarousel;
