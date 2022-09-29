import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Initialize, Content, Signin, Signup, NotFound } from './pages';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import HomeSection from './components/Home/HomeSection';
import UserSection from './components/User/UserSection';
import axios from 'axios';
import UserContext from './context/UserProvider';
import { userStatus } from './context/UserProvider';
import RecipeSection from './components/Recipe/RecipeSection';
import { userProfileUrl } from './api/findRecipeServer';
import { useCallback } from 'react';

function App() {
  const { user, setUser } = useContext(UserContext);

  const isDoneInitializing =
    user.status === userStatus.LOGGEDIN || user.status === userStatus.LOGGEDOUT;

  const getUser = useCallback(async () => {
    try {
      const {
        data: {
          data: { user },
        },
      } = await axios.get(userProfileUrl);

      setUser({ status: userStatus.LOGGEDIN, user: user });
    } catch (error) {
      (error.response.status === 401 || error.response.status === 0) &&
        setUser((prevUserData) => ({
          ...prevUserData,
          status: userStatus.LOGGEDOUT,
        }));
    }
  }, [setUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const renderApp = () => {
    return (
      <Routes>
        <Route path='/' element={<Content />}>
          <Route path='/' element={<HomeSection />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/user-profile' element={<UserSection />} />
          </Route>
          <Route path='/recipe/:type/:slug/:id' element={<RecipeSection />} />
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
