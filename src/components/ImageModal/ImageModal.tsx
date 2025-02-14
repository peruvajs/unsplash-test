import "./ImageModal.scss";
import CloseIcon from "../../assets/ImageModal/close.svg?react";
import { useState } from "react";
import cn from 'classnames';

export function ImageModal({ imageUrl, alt, onClose }: ImageModalProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="UNImage__grid-overlay">
      <button className="UNImage__grid-close" onClick={onClose}>
        <CloseIcon />
      </button>
      <div className="UNImage__grid-content">
        {loading && <p className="UNImage__grid-content-loading">Загрузка...</p>}
        <img
          src={imageUrl}
          alt={alt}
          className={cn("UNImage__grid-content-img", [{ "hidden": loading }])}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}