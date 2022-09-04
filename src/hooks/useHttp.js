import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useHttp = (
  url,
  requestType = 'get',
  body,
  runInitial = true,
  log = false
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    log && console.log('This is running');
  }, []);

  requestType = requestType.trim().toLowerCase();

  const requestData = () => {
    let isMounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        log && console.log('Requesting data');
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
    runInitial && !isLoading && requestData();
  }, []);

  return { data, error, isLoading, requestData };
};

export default useHttp;
