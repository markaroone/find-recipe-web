import React, { useState, useEffect } from 'react';
import styles from './RecipeCarousel.module.css';
import useWidth from '../../hooks/useWidth';

const carouselData = [
  {
    name: 'salad',
    image:
      'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  },
  {
    name: 'burger',
    image:
      'https://images.unsplash.com/photo-1610970878459-a0e464d7592b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2124&q=80',
  },
  {
    name: 'pizza',
    image:
      'https://images.unsplash.com/photo-1598023696416-0193a0bcd302?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2136&q=80',
  },
  {
    name: 'pasta',
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2132&q=80',
  },
  {
    name: 'sandwich',
    image:
      'https://images.unsplash.com/photo-1592415499556-74fcb9f18667?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2225&q=80',
  },
  {
    name: 'dessert',
    image:
      'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: 'seafood',
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: 'vegan',
    image:
      'https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
  },
  {
    name: 'vegetarian',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: 'keto',
    image:
      ' https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1577&q=80',
  },
  {
    name: 'low fat',
    image:
      'https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
  },
  {
    name: 'low carbs',
    image:
      'https://images.unsplash.com/photo-1619096802052-fa98408d6dc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxvdyUyMGNhcmJ8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
  },
];

const breakpoints = [
  { width: 1440, itemsToShow: 6 },
  {
    width: 1300,
    itemsToShow: 4,
  },
  {
    width: 847,
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
    setMaxSlide(12 / numCardsPerSlide);
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
