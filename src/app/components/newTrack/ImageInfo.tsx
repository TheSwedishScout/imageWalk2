import React from "react";
import ImageUpload from "./ImageUpload";
import { ILocationImage } from "./NewMapWrapper";
import { TextField } from "@mui/material";

export const ImageInfo = ({
  images,
  setImages,
}: {
  images: ILocationImage[];
  setImages: React.Dispatch<React.SetStateAction<ILocationImage[]>>;
}) => {
  return (
    <div>
      {images.map((image, index) => (
        <div key={image.id}>
          <ImageUpload
            image={image.image}
            onCallback={(imageFile) => {
              // update image object
              setImages((prev) => {
                const newImages = [...prev];
                newImages[index].imageFile = imageFile;
                return newImages;
              });
            }}
          />
          <TextField
            multiline
            maxRows={4}
            value={image.description}
            onChange={(event) => {
              setImages((prev) => {
                const newImages = [...prev];
                newImages[index].description = event.target.value;
                return newImages;
              });
            }}
          />
          <button
            onClick={() =>
              setImages(images.filter((fimage) => fimage.id != image.id))
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};
