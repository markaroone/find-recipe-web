import React, { createContext, useState } from 'react';

export const userStatus = {
  INITIALIZING: 'initializing',
  LOGGEDOUT: 'loggedout',
  LOGGEDIN: 'loggedin',
};

const UserContext = createContext({
  status: '',
  user: {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    status: userStatus.INITIALIZING,
    user: {},
  });

  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
