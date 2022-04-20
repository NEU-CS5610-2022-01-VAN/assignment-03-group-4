import React, { useState, useEffect } from "react";

export default function UploadImage() {
  const [images, setImages] = useState<any>([]);
  const [imageUrls, setImageUrls] = useState<any>([]);

  useEffect(() => {
    if (images.length < 1) return;

    const newImageUrls = images.map((image) => URL.createObjectURL(image));
    setImageUrls(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }
  return (
    <>
      <input type="file" multiple accept="image/*" onChange={onImageChange} />
      {imageUrls.map((imageSrc) => (
        <img style={{ width: 400 }} src={imageSrc} alt={imageSrc} />
      ))}
    </>
  );
}
