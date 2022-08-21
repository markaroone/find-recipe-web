import React from 'react';
import styles from './RecipeCarousel.module.css';

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
    iamge:
      'https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c2FuZHdpY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
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

const RecipeCarousel = () => {
  return (
    <div className={styles['recipe-carousel']}>
      <ul className={styles['recipe-carousel__list']}>
        {carouselData.map((el, i) => (
          <li key={i} className={styles['recipe-carousel__item']}>
            <img src={`${el.image}`} alt={`${el.name}`} />
            <p>{el.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeCarousel;
