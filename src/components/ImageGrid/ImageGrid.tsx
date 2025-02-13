import { useState } from "react";
import { useFetchImages } from "../../hooks/useFetchImages";
import { ImageModal } from "../ImageModal/ImageModal";
import "./ImageGrid.scss";
import cn from "classnames";

export function ImageGrid({ query }: { query: string }) {
  const { images, loading } = useFetchImages(query);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) {
    return <p style={{ color: "#787878" }}>Загрузка...</p>;
  }

  if (images.length === 0) {
    return <p style={{ color: "#787878" }}>К сожалению, поиск не дал результатов</p>;
  }

  return (
    <>
      <div className="UNImage__grid">
        {images.map((image) => (
          <div key={image.id} className="UNImage__grid-item">
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className={cn("UNImage__grid-img", {
                loaded: loadedImages.includes(image.id),
              })}
              onLoad={() => setLoadedImages((prev) => [...prev, image.id])}
              onClick={() => setSelectedImage(image.urls.full)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}
