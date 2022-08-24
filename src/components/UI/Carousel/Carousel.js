import React, { useState, useEffect } from 'react';
import useWidth from '../../hooks/useWidth';
import styles from './Carousel.module.css';

const Carousel = ({
  children,
  numOfCardsPerSlide,
  onClickCard,
  breakpoints,
}) => {
  const screenWidth = useWidth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(0);
  const [numCardsPerSlide, setNumCardsPerSlide] = useState(numOfCardsPerSlide);

  const autoFitCarouselHandler = () => {
    breakpoints.forEach((el) => {
      el.width >= screenWidth && setNumCardsPerSlide(el.itemsToShow);
    });
  };

  const onClickCardHandler = (e) => {
    let cardId = e.target.parentElement.id;

    cardId = cardId[0].toUpperCase() + cardId.slice(1);

    onClickCard(cardId);
  };

  const slideMoveHandler = (e) => {
    const buttonId = e.target.parentElement.id;
    if (buttonId === 'prev' && currentSlide > 0)
      setCurrentSlide(currentSlide - 1);

    if (buttonId === 'next' && currentSlide < maxSlide - 1)
      setCurrentSlide(currentSlide + 1);
  };

  useEffect(() => {
    autoFitCarouselHandler();
  }, [screenWidth]);

  useEffect(() => {
    setMaxSlide(children.length / numCardsPerSlide);
  }, [numCardsPerSlide, screenWidth]);

  return (
    <div className={styles.carousel}>
      <ul className={styles['carousel__list']}>
        {groupItems(children, numCardsPerSlide).map((el, i) => (
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
        className={styles['carousel__button--prev']}
        onClick={slideMoveHandler}
      >
        <ion-icon name='chevron-back-sharp'></ion-icon>
      </button>

      <button
        id='next'
        className={styles['carousel__button--next']}
        onClick={slideMoveHandler}
      >
        <ion-icon name='chevron-forward-sharp'></ion-icon>
      </button>
    </div>
  );
};

export default Carousel;
