import React, { useState, ChangeEvent } from "react";
import { Input, Typography } from "@mui/material";
import { toast } from "react-toastify";

const ImageUpload = ({
  onCallback,
  image,
}: {
  onCallback: (image: string) => void;
  image?: string | null;
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    image || null
  );

  const handleUpload = (file: File) => {
    // Here, you can handle the image upload logic
    // Example: You can use FormData and an API to upload the image
    const formData = new FormData();
    formData.append("image", file);

    // Example: Make a POST request using fetch or an HTTP library
    fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    }).then(async (response) => {
      // Handle response
      if (response.ok) {
        const data: { message: string; path: string } = await response.json();
        onCallback(data.path);
      } else {
        toast(`error: ${response.status}`);
      }
    });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      handleUpload(file);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Typography variant="h6">Upload Image:</Typography>
      <Input type="file" onChange={handleImageChange} />
      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          style={{ maxWidth: "100%", marginTop: "10px", maxHeight: "300px" }}
        />
      )}
    </div>
  );
};

export default ImageUpload;
