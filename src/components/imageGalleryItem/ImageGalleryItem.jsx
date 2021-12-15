import React from "react";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  openModal,
}) => {
  return (
    <li className={s.ImageGalleryItem} key={id} id={id}>
      <img
        className={s.ImageGalleryItem__image}
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        onClick={openModal}
        loading="lazy"
      />
    </li>
  );
};

export default ImageGalleryItem;
