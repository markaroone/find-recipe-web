import React, { createContext, useState } from 'react';

export const userStatus = {
  INITIALIZING: 'initializing',
  LOGGEDOUT: 'loggedout',
  LOGGEDIN: 'loggedin',
};

export const fetchRecipeStatus = {
  FETCHING: 'fetching',
  LOADED: 'loaded',
  ERROR_FETCH: 'error-fetch',
};

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    status: userStatus.INITIALIZING,
    user: {},
  });

  const [recipes, setRecipes] = useState({
    status: fetchRecipeStatus.FETCHING,
    search: '',
    recipes: {},
  });

  return (
    <UserContext.Provider value={{ user, setUser, recipes, setRecipes }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
