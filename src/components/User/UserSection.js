import React from 'react';
import useFetch from '../../hooks/useFetch';
import useHttp from '../../hooks/useHttp';
import styles from './UserSection.module.css';

const url = 'http://localhost:8000/api/v1/users';

const UserSection = () => {
  // const { data, isLoading, error, fetchData } = useFetch(url);
  const { data, isLoading, error, requestData } = useHttp(url, 'get');

  // console.log(isLoading);
  console.log(data);
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
