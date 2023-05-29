import { useState, useEffect } from "react";
import axios from "axios";
import { WINDY_API_KEY } from "@env";

const API_KEY = WINDY_API_KEY;

interface Params {
  country?: string;
  coordinates?: {
    long: number;
    lat: number;
  };
  limit?: number;
  skip?: boolean;
}

export function useFetchSpots({ country, coordinates, limit, skip }: Params) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const options = {
    method: "GET",
    url: `https://api.windy.com/api/webcams/v2/list/category=water/limit=${
      limit ? String(limit) : "10"
    }/${country ? "country=" + country : ""}${
      coordinates && !country
        ? "/nearby=" +
          String(Math.round(coordinates.lat * 100) / 100) +
          "," +
          String(Math.round(coordinates.long * 100) / 100) +
          ",40"
        : ""
    }?show=webcams:location,url,image`,
    headers: {
      "x-windy-key": API_KEY
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (skip) return;
    fetchData();
  }, [skip]);
  return {
    data: data?.result?.webcams.map(
      ({
        id,
        title,
        url: {
          current: { mobile }
        },
        image: {
          current: { thumbnail }
        }
      }) => ({ id, title, url: mobile, image: thumbnail })
    ),
    error,
    loading
  };
}
