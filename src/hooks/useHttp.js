import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useHttp = (url, requestType = 'get', body, runInitial = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  requestType = requestType.trim().toLowerCase();

  const requestData = () => {
    let isMounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const data = await axios[`${requestType}`](url, body);

        if (isMounted) {
          setData(data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setData(null);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    runInitial && requestData();
  }, []);

  return { data, error, isLoading, requestData };
};

export default useHttp;
