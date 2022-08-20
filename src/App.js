import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import { Initialize, Content, Signin, Signup, NotFound } from './pages';
import HomeSection from './components/Home/HomeSection';
import UserSection from './components/User/UserSection';
import axios from 'axios';
import UserContext from './context/UserProvider';
import { userStatus } from './context/UserProvider';

function App() {
  const { user, setUser } = useContext(UserContext);

  const isDoneInitializing =
    user.status === userStatus.LOGGEDOUT || user === userStatus.LOGGEDOUT;

  const getUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/v1/users/me');
      setUser({ status: userStatus.LOGGEDIN, user: data.user });
    } catch (error) {
      console.log(error);
      (error.response.status === 401 || error.response.status === 0) &&
        setUser((prevUserData) => ({
          ...prevUserData,
          status: userStatus.LOGGEDOUT,
        }));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const renderApp = () => {
    return (
      <Routes>
        <Route path='/' element={<Content />}>
          <Route path='/' element={<HomeSection />} />
          <Route path='/user-profile' element={<UserSection />} />
        </Route>

        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    );
  };

  return (
    <>
      {isDoneInitializing && renderApp()}
      {!isDoneInitializing && <Initialize />}
    </>
  );
}

export default App;
