import React, { useState } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";

const ProfilePictureUpload = ({ formData, setFormData, showSelectButton }) => {
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
    <Stack spacing={2} alignItems="center">
      {/* Avatar Preview */}
      <label htmlFor="file-upload">
        <Avatar sx={{ width: 100, height: 100, cursor: "pointer" }}
          alt="Profile Picture"
          src={
            preview // Show preview first (if user selects a new image)
              ? preview
              : formData?.profilePicture?.startsWith("iVBORw") // Detect base64 (PNG example)
              ? `data:image/png;base64,${formData.profilePicture}`
              : "/default-avatar.png" // Fallback
          }
          />
      </label>
      <Typography variant="h6">
      {formData?.fullName || "New User"}
    </Typography>

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
