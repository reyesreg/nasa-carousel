import { useState, useEffect } from "react";

export type ApiResponseType = {
  data: NasaImageType[] | null;
  loading: boolean;
};

export type NasaImageType = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  thumbnail_url?: string;
};

const useApi = (url: string): ApiResponseType => {
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchApi = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        setData(json);
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, data };
};

export default useApi;
