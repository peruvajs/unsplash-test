import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ImageResponse, ImageResult } from "../types/ImageGrid.d";

const API_URL = "https://api.unsplash.com/search/photos";
const CLIENT_ID = "Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs";

export function useFetchImages(query: string) {
  const [images, setImages] = useState<ImageResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = useCallback(async () => {
    if (!query || !hasMore) return;

    setLoading(true);
    try {
      const { data } = await axios.get<ImageResponse>(API_URL, {
        params: {
          client_id: CLIENT_ID,
          query,
          page,
          per_page: 30,
        },
      });

      setImages((prev) => [...prev, ...data.results]);
      setHasMore(data.results.length > 0);
    } catch (error) {
      console.error("error loading images: ", error);
    }
    setLoading(false);
  }, [query, page, hasMore]);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  return { images, loading, loadMore };
}
