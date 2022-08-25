import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useHttp = (url, requestType = 'get', options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  requestType = requestType.trim().toLowerCase();

  useEffect(() => {
    let isMounted_ = true;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const data = await axios[`${requestType}`](url, options);

        if (isMounted_) {
          setData(data);
          setError(null);
        }
      } catch (error) {
        if (isMounted_) {
          setError(error);
          setData(null);
        }
      } finally {
        isMounted_ && setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted_ = false;
    };
  }, []);

  const requestData = () => {
    let isMounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const data = await axios[`${requestType}`](url, options);

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

  return { data, error, isLoading, requestData };
};

export default useHttp;
