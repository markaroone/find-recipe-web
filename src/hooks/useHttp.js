import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const ax = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
});

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { url, method, body } = requestConfig;

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      //   const response = await fetch(requestConfig.url, {
      //     method: requestConfig.method,
      //     headers: requestConfig.headers,
      //     body: JSON.stringify(requestConfig.body),
      //   });

      const response = await axios[`${method.toLowerCase()}`](
        `http://localhost:8000/api/v1/${url}`,
        body
      );

      //   if (!response.ok) {
      //     throw new Error('Request failed!');
      //   }
      console.log(response);

      const { data } = response;

      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
