import React, { useEffect, useState } from 'react';
import { singleRecipeUrl, multipleRecipesUrl } from '../../api/edamam';

import useFetch from '../../hooks/useFetch';
import useHttp from '../../hooks/useHttp';
import styles from './UserSection.module.css';

// const url = 'http://localhost:8000/api/v1/users';

const UserSection = () => {
  const url = multipleRecipesUrl.replace('<TYPE>', 'Adobo');
  const singleUrl = singleRecipeUrl.replace(
    '<ID>',
    '99108913a82294bb61543d534ea06b43'
  );

  // const { data, isLoading, error, fetchData } = useFetch(url);
  const { data, isLoading, error, requestData } = useHttp(singleUrl, 'get');

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    data && setRecipe(data.recipe);
  }, [data]);

  // console.log(isLoading);
  data && console.log(data);
  // console.log(error);

  return (
    <>
      <button onClick={requestData}>UserSection</button>
      {data && <p>Request Status: {data.status}</p>}
      {!data && isLoading && <p>Loading...</p>}
    </>
  );
};

export default UserSection;
