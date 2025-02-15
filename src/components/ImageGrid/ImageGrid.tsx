import { useState, useRef, useCallback, useEffect } from "react";
import { useFetchImages } from "../../hooks/useFetchImages";
import { ImageModal } from "../ImageModal/ImageModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./ImageGrid.scss";
import "react-lazy-load-image-component/src/effects/black-and-white.css";

export function ImageGrid({ query }: { query: string }) {
  const { images, loading, loadMore } = useFetchImages(query);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const lastImageRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, loadMore]
  );

  if (loading && images.length === 0) {
    return <p style={{ color: "#787878" }}>Загрузка...</p>;
  }

  if (images.length === 0) {
    return <p style={{ color: "#787878" }}>К сожалению, поиск не дал результатов</p>;
  }

  return (
    <>
      <div className="UNImage__grid">
        {images.map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            className="UNImage__grid-item"
            ref={index === images.length - 1 ? lastImageRef : null}
          >
            <LazyLoadImage
              src={image.urls.small}
              alt={image.alt_description}
              placeholderSrc={image.urls.thumb}
              effect="black-and-white"
              className="UNImage__grid-img"
              wrapperClassName="UNImage__grid-img-wrapper"
              onClick={() => setSelectedImage(image.urls.full)}
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