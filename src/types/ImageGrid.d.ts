export interface ImageResponse {
  total: number;
  total_pages: number;
  results: ImageResult[];
}

export interface ImageResult {
  id: string;
  urls: Urls;
  alt_description?: string;
  width: number;
  height: number;
}

export interface ImageUrls {
  small: string;
  full: string;
  thumb: string;
}
