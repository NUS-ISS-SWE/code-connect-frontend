/* eslint-disable react/prop-types */
import  { useState } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";

const ProfilePictureUpload = ({ formData, setFormData, showSelectButton = true }) => {
    const [preview, setPreview] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const objectUrl = URL.createObjectURL(file); // Create a temporary preview URL
      
          setPreview(objectUrl); // Update preview state
      
          // Update formData with the file object, not the preview URL
          setFormData((prev) => ({
            ...prev,
            profilePicture: file, // Keep the file for upload
          }));
        }
      };
      

  return (
    <Stack className="items-center py-2 space-y-4">
      {/* Avatar Preview */}
      <label htmlFor="file-upload">
        <Avatar className="border border-gray-300 cursor-pointer !h-[100px] !w-[100px]"
          alt="Profile Picture"
          src={
            preview // Show preview first (if user selects a new image)
              ? preview
              : formData?.profilePicture != null 
              ? `data:image/png;base64,${formData.profilePicture}`
              : "/default-avatar.png" // Fallback
          }
          />
      </label>

      {/* Hidden File Input */}
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

 {showSelectButton ?
        <Button variant="contained" component="label">
        Select Image
        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
      </Button>
    : null}
    </Stack>
  );
};

export default ProfilePictureUpload;
