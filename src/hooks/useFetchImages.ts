import { useState, useEffect } from "react";
import axios from "axios";
import { ImageResponse, ImageResult } from "../types/ImageGrid.d";

const API_URL = "https://api.unsplash.com/search/photos";
const CLIENT_ID = "Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs";

export function useFetchImages(query: string) {
  const [images, setImages] = useState<ImageResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setImages([]);
    setLoading(true);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    async function fetchImages() {
      try {
        const { data } = await axios.get<ImageResponse>(API_URL, {
          params: {
            client_id: CLIENT_ID,
            query,
            page: 1,
          },
        });

        setImages(data.results);
      } catch (error) {
        console.error("error loading images:", error);
      }
      setLoading(false);
    }

    fetchImages();
  }, [query]);

  return { images, loading };
}