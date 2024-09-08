import { useState, useEffect } from "react";
import axiosClient from "../../util/axiosClient";

const useAxios = (config) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosClient(config);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (config.url) {
      fetchData();
    }
  }, [config.url]);

  return { data, error, loading, fetchData };
};

export default useAxios;
