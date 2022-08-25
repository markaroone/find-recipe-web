import React, { createContext, useState, useEffect } from 'react';

export const userStatus = {
  INITIALIZING: 'initializing',
  LOGGEDOUT: 'loggedout',
  LOGGEDIN: 'loggedin',
};

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    status: userStatus.INITIALIZING,
    user: {},
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    user.status === userStatus.LOGGEDIN && setIsLoggedIn(true);
    user.status === userStatus.LOGGEDOUT && setIsLoggedIn(false);
  }, [user]);

  const signoutUser = () => {
    setUser({ status: userStatus.LOGGEDOUT, user: {} });
  };

  return (
    <UserContext.Provider value={{ user, setUser, signoutUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
