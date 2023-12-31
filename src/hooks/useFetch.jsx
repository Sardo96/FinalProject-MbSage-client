import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = url => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const reFetch = () => {
    const selectData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log('reFetch');
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    selectData();
  };

  return { data, isLoading, error, reFetch };
};

export default useFetch;
