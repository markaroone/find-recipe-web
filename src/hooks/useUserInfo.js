import React, { useState } from 'react';
import axios from 'axios';

const useUserInfo = () => {
  (async () => {
    try {
      const {
        data: {
          data: { user },
        },
      } = await axios.get('http://localhost:8000/api/v1/users/me');
      setUser({ status: userStatus.LOGGEDIN, user: user });
    } catch (error) {
      (error.response.status === 401 || error.response.status === 0) &&
        setUser((prevUserData) => ({
          ...prevUserData,
          status: userStatus.LOGGEDOUT,
        }));
    }
  })();

  return <div>useUserInfo</div>;
};

export default useUserInfo;
