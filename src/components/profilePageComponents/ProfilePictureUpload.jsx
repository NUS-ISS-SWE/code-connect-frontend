/* eslint-disable react/prop-types */
import { Avatar, Button, Stack } from "@mui/material";
import { useState } from "react";

import { uploadEmployeeProfilePicture } from "../../api/EmployeeProfilesApi";
import { uploadEmployerProfilePicture } from "../../api/EmployerProfilesApi";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { ROLES } from "../../constants/roles";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProfilePictureUpload = ({ showSelectButton = true }) => {
  const { user } = useAuthContext();
  const {
    state: { profileImage },
    dispatch,
  } = useGlobalContext();

  const [preview, setPreview] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const { status } =
        user.role === ROLES.get("employer").value
          ? await uploadEmployerProfilePicture(file, dispatch)
          : await uploadEmployeeProfilePicture(file, dispatch);

      if (status === 200) {
        const dataURL = await fileToDataUrl(file);

        setPreview(dataURL); // Update preview state

        // Update global state with the new image
        dispatch({
          type: "PROFILE_IMAGE",
          payload: dataURL,
        });
      }
    }
  };

  const fileToDataUrl = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    await new Promise((resolve) => (reader.onload = () => resolve()));

    return reader.result;
  };

  return (
    <Stack className="items-center py-2 space-y-4">
      {/* Avatar Preview */}
      <label htmlFor="file-upload">
        <Avatar
          className="border border-gray-300 cursor-pointer !h-[100px] !w-[100px]"
          alt="Profile Picture"
          src={
            preview // Show preview first (if user selects a new image)
              ? preview
              : profileImage || "/default-avatar.png"
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

      {showSelectButton ? (
        <Button variant="contained" component="label">
          Select Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
      ) : null}
    </Stack>
  );
};

export default ProfilePictureUpload;
