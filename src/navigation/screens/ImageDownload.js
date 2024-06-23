import React, { useState, useEffect } from "react";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://work-it-back.vercel.app/api/user/gallery"
        );
        const data = await response.json();

        if (data.success) {
          setImages(data.images);

          if (data.images.length > 0) {
            setSelectedImage(data.images[0].url);
          }
        } else {
          console.error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchImages();
  }, []);

  const testPrint = () => {
    console.log("the selected image is ", selectedImage);
  };

  const handleImagePreview = async (imageUrl) => {
    setSelectedImage(imageUrl);
    await testPrint();
  };

  return (
    <div>
      <h2>Image Gallery</h2>
      <div>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            style={{
              width: "150px",
              height: "150px",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleImagePreview(image.url)}
            alt="here"
          />
        ))}
      </div>
      <div>
        <h3>Preview Selected Image</h3>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected Image"
            style={{ width: "100%" }}
          />
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
