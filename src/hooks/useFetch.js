import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     axios
  //       .get(url)
  //       .then((response) => setData(response.data))
  //       .catch(setError)
  //       .finally(() => setIsLoading(false));
  //   }, [url]);

  const fetchData = () => {
    setIsLoading(true);
    setData(null);
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  return { data, error, isLoading, fetchData };
};

export default useFetch;
