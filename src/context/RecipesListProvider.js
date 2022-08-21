import React, { createContext, useState } from 'react';

export const fetchRecipeStatus = {
  FETCHING: 'fetching',
  LOADED: 'loaded',
};

const RecipeListContext = createContext({
  status: '',
  search: '',
  recipes: {},
});

export const RecipeListProvider = ({ children }) => {
  const [recipes, setRecipes] = useState({
    status: fetchRecipeStatus.FETCHING,
    search: '',
    recipes: {},
  });

  return (
    <RecipeListContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeListContext.Provider>
  );
};

export default RecipeListContext;
